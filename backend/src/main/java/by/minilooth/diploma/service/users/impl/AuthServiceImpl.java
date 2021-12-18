package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.exception.users.AuthorityNotFoundException;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.LoginParams;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.models.RestorePasswordParams;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.security.jwt.JwtUtils;
import by.minilooth.diploma.service.common.MailService;
import by.minilooth.diploma.service.users.AuthService;
import by.minilooth.diploma.service.users.ConfirmationTokenService;
import by.minilooth.diploma.service.users.RoleService;
import by.minilooth.diploma.service.users.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import by.minilooth.diploma.models.bean.users.User;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserService userService;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private RoleService roleService;
    @Autowired private ConfirmationTokenService confirmationTokenService;
    @Autowired private MailService mailService;

    @Override
    public Boolean isLoggedIn() {
        return SecurityContextHolder.getContext().getAuthentication() != null &&
                SecurityContextHolder.getContext().getAuthentication().isAuthenticated() &&
                !(SecurityContextHolder.getContext().getAuthentication()
                        instanceof AnonymousAuthenticationToken);
    }

    @Override
    public User getPrincipal() {
        if (isLoggedIn()) {
            return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.getByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Не удалось найти пользователя с именем пользователя: " + username));
    }

    private Cookie getTokenCookie(String token) {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, URLEncoder.encode(String.format("Bearer %s", token), StandardCharsets.UTF_8));
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) jwtUtils.getExpirationDate(token).getTime());
        cookie.setPath("/");
        return cookie;
    }

    private Cookie getRemovedTokenCookie() {
        Cookie cookie = new Cookie(TOKEN_COOKIE_NAME, null); // Not necessary, but saves bandwidth.
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // Don't set to -1 or it will become a session cookie!
        return cookie;
    }

    @Override
    public void removeTokenCookie(HttpServletResponse res) {
        res.addCookie(getRemovedTokenCookie());
    }

    @Override
    public User authorize(LoginParams params, HttpServletResponse res) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(params.getUsername(), params.getPassword()));

        User user = (User) authentication.getPrincipal();
        String token = jwtUtils.generateJwtToken(user);
        Cookie cookie = getTokenCookie(token);

        res.addCookie(cookie);

        return user;
    }

    @Override
    public User register(User user) throws UserAlreadyExistsException, AuthorityNotFoundException {
        if (StringUtils.isEmpty(user.getUsername()) || userService.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExistsException("Пользователь с таким именем пользователя уже существует");
        }

        if (StringUtils.isEmpty(user.getEmail()) || userService.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("Пользователь с таким e-mail уже существует");
        }

        if (StringUtils.isEmpty(user.getPhoneNumber()) || userService.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new UserAlreadyExistsException("Пользователь с таким номером телефона уже существует");
        }

        String password = RandomStringUtils.randomAlphanumeric(GENERATED_PASSWORD_LENGTH);

        Set<Role> authorities = Collections.singleton(roleService.getByAuthority(Role.EMPLOYEE)
                .orElseThrow(() -> new AuthorityNotFoundException(Role.EMPLOYEE)));

        User registeredUser = User.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .middlename(user.getMiddlename())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .password(passwordEncoder.encode(password))
                .authorities(authorities)
                .isAccountNonDisabled(false)
                .cart(Cart.builder().build())
                .build();

        userService.save(registeredUser);

        ConfirmationToken token = ConfirmationToken.builder()
                .user(registeredUser)
                .token(UUID.randomUUID().toString())
                .build();

        confirmationTokenService.save(token);
        mailService.sendConfirmRegisterMain(registeredUser, password, token);

        return registeredUser;
    }

    @Override
    public void restorePassword(RestorePasswordParams params) throws UserNotFoundException {
        User user = userService.getByEmail(params.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя с таким e-mail"));

        String password = RandomStringUtils.randomAlphanumeric(GENERATED_PASSWORD_LENGTH);

        user.setPassword(passwordEncoder.encode(password));
        userService.save(user);

        mailService.sendRestorePasswordMail(user, password);
    }

    @Override
    public Boolean isUsernameBusy(String username) {
        return userService.existsByUsername(username);
    }

    @Override
    public Boolean isEmailBusy(String email) {
        return userService.existsByEmail(email);
    }

    @Override
    public Boolean isPhoneNumberBusy(String phoneNumber) {
        return userService.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public Boolean isRestorePasswordAllowed(String email) throws UserNotFoundException {
        User user = userService.getByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя с таким e-mail"));
        return user.getIsEmailConfirmed();
    }

}
