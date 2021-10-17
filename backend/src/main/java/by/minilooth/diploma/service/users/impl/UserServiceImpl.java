package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.BadPasswordException;
import by.minilooth.diploma.exception.PasswordsAreDifferentException;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.ChangePassword;
import by.minilooth.diploma.models.ProcessUser;
import by.minilooth.diploma.models.UserFilter;
import by.minilooth.diploma.models.bean.UserSort;
import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.models.enums.SortDirection;
import by.minilooth.diploma.repository.users.UserRepository;
import by.minilooth.diploma.service.common.MailService;
import by.minilooth.diploma.service.users.AuthService;
import by.minilooth.diploma.service.users.ConfirmationTokenService;
import by.minilooth.diploma.service.users.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import by.minilooth.diploma.models.bean.users.User;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final static Long ITEMS_PER_PAGE = 9L;

    @Autowired private ConfirmationTokenService confirmationTokenService;
    @Autowired private UserRepository userRepository;
    @Autowired private MailService mailService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthService authService;

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public User save(ProcessUser processUser) throws UserAlreadyExistsException {
        if (StringUtils.isEmpty(processUser.getUsername()) || existsByUsername(processUser.getUsername())) {
            throw new UserAlreadyExistsException("Пользователь с таким именем пользователя уже существует");
        }

        if (StringUtils.isEmpty(processUser.getEmail()) || existsByEmail(processUser.getEmail())) {
            throw new UserAlreadyExistsException("Пользователь с таким E-mail уже существует");
        }

        String password = RandomStringUtils.randomAlphanumeric(AuthService.GENERATED_PASSWORD_LENGTH);

        User user = User.builder()
                .username(processUser.getUsername())
                .email(processUser.getEmail())
                .password(passwordEncoder.encode(password))
                .firstname(processUser.getFirstname())
                .lastname(processUser.getLastname())
                .middlename(processUser.getMiddlename())
                .phoneNumber(processUser.getPhoneNumber())
                .avatar(processUser.getAvatar())
                .authorities(new HashSet<>(Set.of(processUser.getRole())))
                .build();

        save(user);

        ConfirmationToken confirmationToken = new ConfirmationToken(user);
        confirmationTokenService.save(confirmationToken);

        mailService.sendConfirmRegisterMain(user, password, confirmationToken);

        return user;
    }

    @Override
    public User update(ProcessUser processUser, Long id) throws UserAlreadyExistsException, UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));

        if (!user.getUsername().equals(processUser.getUsername()) && (StringUtils.isEmpty(processUser.getUsername()) ||
                existsByUsername(processUser.getUsername()))) {
            throw new UserAlreadyExistsException("Пользователь с таким именем пользователя уже существует");
        }

        if (!user.getEmail().equals(processUser.getEmail()) && (StringUtils.isEmpty(processUser.getEmail()) ||
                existsByEmail(processUser.getEmail()))) {
            throw new UserAlreadyExistsException("Пользователь с таким E-mail уже существует");
        }

        boolean emailChanged = !user.getEmail().equals(processUser.getEmail());

        user.setUsername(processUser.getUsername());
        user.setEmail(processUser.getEmail());
        user.setFirstname(processUser.getFirstname());
        user.setLastname(processUser.getLastname());
        user.setMiddlename(processUser.getMiddlename());
        user.setEmail(processUser.getEmail());
        user.setAuthorities(new HashSet<>(Set.of(processUser.getRole())));
        user.setAvatar(processUser.getAvatar());
        user.setIsEmailConfirmed(!emailChanged && user.getIsEmailConfirmed());

        save(user);

        if (emailChanged) {
            ConfirmationToken confirmationToken = new ConfirmationToken(user);
            confirmationTokenService.save(confirmationToken);

            mailService.sendConfirmEmailMail(user, confirmationToken);
        }

        return user;
    }

    @Override
    public User delete(Long id) throws UserNotFoundException, ActionIsImpossibleException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));
        User me = authService.getPrincipal();

        if (user.getId().equals(me.getId())) {
            throw new ActionIsImpossibleException("Невозможно удалить самого себя");
        }

        delete(user);
        return user;
    }

    @Override
    public User lock(Long id) throws UserNotFoundException, ActionIsImpossibleException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));
        User me = authService.getPrincipal();

        if (user.getId().equals(me.getId())) {
            throw new ActionIsImpossibleException("Невозможно заблокировать/разблокировать самого себя");
        }

        user.setIsAccountNonLocked(!user.getIsAccountNonLocked());
        save(user);

        return user;
    }

    @Override
    public User changePassword(ChangePassword changePassword) throws PasswordsAreDifferentException, BadPasswordException {
        User me = authService.getPrincipal();

        if (!changePassword.getNewPassword().equals(changePassword.getConfirmPassword())) {
            throw new PasswordsAreDifferentException("Пароли не совпадают");
        }

        if (!passwordEncoder.encode(changePassword.getOldPassword()).equals(me.getPassword())) {
            throw new BadPasswordException("Неверный старый пароль");
        }

        me.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        save(me);

        return me;
    }

    @Override
    public User changePassword(Long id, ChangePassword changePassword) throws UserNotFoundException, PasswordsAreDifferentException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));

        if (!changePassword.getNewPassword().equals(changePassword.getConfirmPassword())) {
            throw new PasswordsAreDifferentException("Пароли не совпадают");
        }

        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        save(user);

        return user;
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getAll(UserFilter filter) {
        Integer page = filter.getPage();
        UserSort userSort = filter.getSort();
        SortDirection sortDirection = filter.getSortDirection();

        Comparator<User> comparator = getComparator(userSort, sortDirection);

        Stream<User> users = userRepository.findAll().stream();

        if (Objects.nonNull(comparator)) {
            users = users.sorted(comparator);
        }

        String fullname = filter.getFullname();
        if (Objects.nonNull(fullname) && !fullname.isEmpty()) {
            users = users.filter(u -> (u.getFirstname() + " " + u.getLastname()).startsWith(fullname));
        }

        String email = filter.getEmail();
        if (Objects.nonNull(email) && !email.isEmpty()) {
            users = users.filter(u -> Objects.nonNull(u.getEmail()) && u.getEmail().startsWith(email));
        }

        String phoneNumber = filter.getPhoneNumber();
        if (Objects.nonNull(phoneNumber) && !phoneNumber.isEmpty()) {
            users = users.filter(u -> Objects.nonNull(u.getPhoneNumber()) && u.getPhoneNumber().startsWith(phoneNumber));
        }

        Date registerDateFrom = filter.getRegisterDateFrom();
        if (Objects.nonNull(registerDateFrom)) {
            users = users.filter(u -> u.getCreatedAt().after(registerDateFrom));
        }

        Date registerDateTo = filter.getRegisterDateTo();
        if (Objects.nonNull(registerDateTo)) {
            users = users.filter(u -> u.getCreatedAt().before(registerDateTo));
        }

        String search = filter.getSearch();
        if (Objects.nonNull(search) && !search.isEmpty()) {
            users = users.filter(u -> u.getUsername().startsWith(search));
        }

        users = users.skip((Objects.nonNull(page) ? page - 1 : 0) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);

        return users.collect(Collectors.toList());
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void confirmEmail(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.getByToken(token);

        User user = confirmationToken.getUser();
        user.setIsEmailConfirmed(true);
        save(user);

        confirmationTokenService.delete(confirmationToken);
    }

    private Comparator<User> getComparator(UserSort userSort) {
        if (Objects.nonNull(userSort)) {
            switch (userSort) {
                case USERNAME:
                    return Comparator.comparing(User::getUsername);
                case EMAIL:
                    return Comparator.comparing(User::getEmail);
                case LASTNAME:
                    return Comparator.comparing(User::getLastname);
                case FIRSTNAME:
                    return Comparator.comparing(User::getFirstname);
                case PHONE_NUMBER:
                    return Comparator.comparing(User::getPhoneNumber);
                case CREATED_AT:
                    return Comparator.comparing(User::getCreatedAt);
                default:
                    return null;
            }
        }
        return null;
    }

    private Comparator<User> getComparator(UserSort userSort, SortDirection sortDirection) {
        Comparator<User> comparator = getComparator(userSort);

        if (Objects.nonNull(sortDirection)) {
            switch (sortDirection) {
                case DESC:
                    return comparator.reversed();
                case ASC:
                default:
                    return comparator;
            }
        }

        return comparator;
    }

}
