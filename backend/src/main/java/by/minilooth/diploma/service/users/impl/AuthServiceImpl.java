package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.LoginParams;
import by.minilooth.diploma.models.RegisterParams;
import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.models.RestorePasswordParams;
import by.minilooth.diploma.security.jwt.JwtUtils;
import by.minilooth.diploma.service.common.MailService;
import by.minilooth.diploma.service.users.AuthService;
import by.minilooth.diploma.service.users.ConfirmationTokenService;
import by.minilooth.diploma.service.users.RoleService;
import by.minilooth.diploma.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
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
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final ConfirmationTokenService confirmationTokenService;
    private final MailService mailService;

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
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
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
    public User register(RegisterParams params) throws UserAlreadyExistsException {
        if (StringUtils.isEmpty(params.getUsername()) || userService.existsByUsername(params.getUsername())) {
            throw new UserAlreadyExistsException("User with provided username is already exists");
        }

        if (StringUtils.isEmpty(params.getEmail()) || userService.existsByEmail(params.getEmail())) {
            throw new UserAlreadyExistsException("User with provided e-mail is already exists");
        }

        String password = RandomStringUtils.randomAlphanumeric(GENERATED_PASSWORD_LENGTH);

        User user = User.builder()
                .username(params.getUsername())
                .email(params.getEmail())
                .password(passwordEncoder.encode(password))
                .authorities(new HashSet<>(roleService.getAll()))
                .build();

        userService.save(user);

        ConfirmationToken confirmationToken = new ConfirmationToken(user);
        confirmationTokenService.save(confirmationToken);

        mailService.sendConfirmRegisterMain(user, password, confirmationToken);

        return user;
    }

    @Override
    public void restorePassword(RestorePasswordParams params) throws UserNotFoundException {
        User user = userService.getByEmail(params.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User with provided e-mail not found"));

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
    public Boolean isRestorePasswordAllowed(String email) throws UserNotFoundException {
        User user = userService.getByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with provided e-mail not found"));
        return user.getIsEmailConfirmed();
    }

}
