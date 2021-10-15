package by.minilooth.diploma.repository.users;

import org.springframework.data.jpa.repository.JpaRepository;
import by.minilooth.diploma.models.bean.users.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.QueryHint;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "User.findByUsername")
    Optional<User> findByUsername(String username);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "User.findByEmail")
    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "User.findAll")
    List<User> findAll();

}
