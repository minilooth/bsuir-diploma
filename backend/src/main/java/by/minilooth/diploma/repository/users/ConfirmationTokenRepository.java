package by.minilooth.diploma.repository.users;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String> {

    ConfirmationToken findByToken(String token);

}
