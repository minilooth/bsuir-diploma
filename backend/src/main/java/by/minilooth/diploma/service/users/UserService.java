package by.minilooth.diploma.service.users;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.BadPasswordException;
import by.minilooth.diploma.exception.PasswordsAreDifferentException;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.ChangePassword;
import by.minilooth.diploma.models.ProcessUser;
import by.minilooth.diploma.models.UserFilter;
import by.minilooth.diploma.models.bean.users.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void save(User user);
    User save(ProcessUser processUser) throws UserAlreadyExistsException;
    User update(ProcessUser processUser, Long id) throws UserAlreadyExistsException, UserNotFoundException;
    void delete(User user);
    User delete(Long id) throws UserNotFoundException, ActionIsImpossibleException;
    User lock(Long id) throws UserNotFoundException, ActionIsImpossibleException;
    User changePassword(Long id, ChangePassword changePassword) throws UserNotFoundException, PasswordsAreDifferentException;
    User changePassword(ChangePassword changePassword) throws PasswordsAreDifferentException, BadPasswordException;
    Optional<User> getByUsername(String username);
    Optional<User> getByEmail(String email);
    List<User> getAll();
    List<User> getAll(UserFilter filter);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    void confirmEmail(String token);

}
