package by.minilooth.diploma.service.users;

import by.minilooth.diploma.models.bean.users.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void save(User user);
    void delete(User user);
    Optional<User> getByUsername(String username);
    Optional<User> getByEmail(String email);
    List<User> getAll();
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    void confirmEmail(String token);

}
