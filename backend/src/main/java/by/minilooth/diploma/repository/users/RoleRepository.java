package by.minilooth.diploma.repository.users;

import by.minilooth.diploma.models.bean.users.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByAuthority(String name);

}
