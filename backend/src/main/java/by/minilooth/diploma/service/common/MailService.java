package by.minilooth.diploma.service.common;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.models.bean.users.User;

public interface MailService {

    void sendConfirmRegisterMain(User user, String password, ConfirmationToken confirmationToken);
    void sendRestorePasswordMail(User user, String password);

}
