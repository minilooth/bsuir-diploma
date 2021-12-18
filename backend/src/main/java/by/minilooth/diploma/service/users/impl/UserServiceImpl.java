package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.BadPasswordException;
import by.minilooth.diploma.exception.PasswordsAreDifferentException;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.ChangePassword;
import by.minilooth.diploma.models.ProcessUser;
import by.minilooth.diploma.models.UserFilter;
import by.minilooth.diploma.models.UserList;
import by.minilooth.diploma.common.enums.UserSort;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.common.enums.SortDirection;
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

        if (StringUtils.isEmpty(processUser.getPhoneNumber()) || existsByPhoneNumber(processUser.getPhoneNumber())) {
            throw new UserAlreadyExistsException("Пользователь с таким номером телефона уже существует");
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
                .cart(Cart.builder().build())
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

        if (!StringUtils.equals(user.getUsername(), processUser.getUsername()) && (StringUtils.isEmpty(processUser.getUsername()) ||
                existsByUsername(processUser.getUsername()))) {
            throw new UserAlreadyExistsException("Пользователь с таким именем пользователя уже существует");
        }

        if (!StringUtils.equals(user.getEmail(), processUser.getEmail()) && (StringUtils.isEmpty(processUser.getEmail()) ||
                existsByEmail(processUser.getEmail()))) {
            throw new UserAlreadyExistsException("Пользователь с таким E-mail уже существует");
        }

        if (!StringUtils.equals(user.getPhoneNumber(), processUser.getPhoneNumber()) && (StringUtils.isEmpty(processUser.getPhoneNumber()) ||
                existsByPhoneNumber(processUser.getPhoneNumber()))) {
            throw new UserAlreadyExistsException("Пользователь с таким номером телефона уже существует");
        }

        boolean emailChanged = !StringUtils.equals(user.getEmail(), processUser.getEmail());

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
        User user = getById(id).orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));
        User me = authService.getPrincipal();

        if (user.getId().equals(me.getId())) {
            throw new ActionIsImpossibleException("Невозможно заблокировать/разблокировать самого себя");
        }

        user.setIsAccountNonLocked(!user.getIsAccountNonLocked());
        save(user);

        return user;
    }

    @Override
    public User enable(Long id) throws UserNotFoundException {
        User user = getById(id).orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));

        user.setIsAccountNonDisabled(true);
        save(user);

        return user;
    }

    @Override
    public User changePassword(ChangePassword changePassword) throws PasswordsAreDifferentException, BadPasswordException {
        User me = authService.getPrincipal();

        if (!StringUtils.equals(changePassword.getNewPassword(), changePassword.getConfirmPassword())) {
            throw new PasswordsAreDifferentException("Пароли не совпадают");
        }

        if (!passwordEncoder.matches(changePassword.getOldPassword(), me.getPassword())) {
            throw new BadPasswordException("Неверный старый пароль");
        }

        me.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        save(me);

        return me;
    }

    @Override
    public User changePassword(Long id, ChangePassword changePassword) throws UserNotFoundException, PasswordsAreDifferentException {
        User user = getById(id).orElseThrow(() -> new UserNotFoundException("Не удалось найти пользователя"));

        if (!StringUtils.equals(changePassword.getNewPassword(), changePassword.getConfirmPassword())) {
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
    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public UserList getAll(UserFilter filter) {
        Integer page = filter.getPage();
        UserSort userSort = filter.getSort();
        SortDirection sortDirection = filter.getSortDirection();

        Comparator<User> comparator = getComparator(userSort, sortDirection);

        Stream<User> userStream = getAll().stream();

        if (Objects.nonNull(comparator)) {
            userStream = userStream.sorted(comparator);
        }

        String fullname = filter.getFullname();
        if (Objects.nonNull(fullname) && !fullname.isEmpty()) {
            userStream = userStream.filter(u -> (u.getFirstname() + " " + u.getLastname()).startsWith(fullname));
        }

        String email = filter.getEmail();
        if (Objects.nonNull(email) && !email.isEmpty()) {
            userStream = userStream.filter(u -> Objects.nonNull(u.getEmail()) && u.getEmail().startsWith(email));
        }

        String phoneNumber = filter.getPhoneNumber();
        if (Objects.nonNull(phoneNumber) && !phoneNumber.isEmpty()) {
            userStream = userStream.filter(u -> Objects.nonNull(u.getPhoneNumber()) && u.getPhoneNumber().startsWith(phoneNumber));
        }

        Date registerDateFrom = filter.getRegisterDateFrom();
        if (Objects.nonNull(registerDateFrom)) {
            userStream = userStream.filter(u -> u.getCreatedAt().after(registerDateFrom));
        }

        Date registerDateTo = filter.getRegisterDateTo();
        if (Objects.nonNull(registerDateTo)) {
            userStream = userStream.filter(u -> u.getCreatedAt().before(registerDateTo));
        }

        String search = filter.getSearch();
        if (Objects.nonNull(search) && !search.isEmpty()) {
            userStream = userStream.filter(u -> u.getUsername().startsWith(search));
        }

        List<User> users = userStream.collect(Collectors.toList());
        Integer count = users.size();

        users = users.stream().skip((Objects.nonNull(page) ? page - 1 : 0) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
                .collect(Collectors.toList());

        UserList userList = UserList.builder()
                .users(users)
                .build();

        userList.setPages((count % ITEMS_PER_PAGE == 0 ? (count / ITEMS_PER_PAGE) : ((count / ITEMS_PER_PAGE) + 1L)));

        return userList;
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
    public Boolean existsByPhoneNumber(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
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

        if (Objects.nonNull(sortDirection) && Objects.nonNull(comparator)) {
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

    @Override
    public User updateProfile(User user) throws UserNotFoundException, UserAlreadyExistsException {
        User principal = authService.getPrincipal();
        User current = getById(principal.getId())
                .orElseThrow(() -> new UserNotFoundException("Не удалось найти текущего пользователя"));

        if (!StringUtils.equals(user.getPhoneNumber(), current.getPhoneNumber()) && (StringUtils.isEmpty(user.getPhoneNumber()) ||
                existsByPhoneNumber(user.getPhoneNumber()))) {
            throw new UserAlreadyExistsException("Пользователь с таким номером телефона уже существует");
        }

        current.setFirstname(user.getFirstname());
        current.setMiddlename(user.getMiddlename());
        current.setLastname(user.getLastname());
        current.setPhoneNumber(user.getPhoneNumber());
        current.setAvatar(user.getAvatar());

        save(current);
        return current;
    }
}
