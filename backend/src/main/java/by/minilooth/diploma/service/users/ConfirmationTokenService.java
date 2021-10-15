package by.minilooth.diploma.service.users;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;

public interface ConfirmationTokenService {

    void save(ConfirmationToken confirmationToken);
    void delete(ConfirmationToken confirmationToken);
    ConfirmationToken getByToken(String token);

}
