package by.minilooth.diploma.service.users;

import by.minilooth.diploma.models.bean.users.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    void save(Role role);
    void delete(Role role);
    List<Role> getAll();
    Optional<Role> getByAuthority(String name);

}
