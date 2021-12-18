package by.minilooth.diploma.service.users;

import by.minilooth.diploma.exception.users.AuthorityNotFoundException;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.LoginParams;
import by.minilooth.diploma.models.RegisterParams;
import by.minilooth.diploma.models.RestorePasswordParams;
import by.minilooth.diploma.models.bean.users.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletResponse;

public interface AuthService extends UserDetailsService {

    Integer GENERATED_PASSWORD_LENGTH = 16;
    String TOKEN_COOKIE_NAME = "token";

    Boolean isLoggedIn();
    User getPrincipal();
    User authorize(LoginParams params, HttpServletResponse res);
    void removeTokenCookie(HttpServletResponse res);
    User register(User user) throws UserAlreadyExistsException, AuthorityNotFoundException;
    void restorePassword(RestorePasswordParams params) throws UserNotFoundException;
    Boolean isUsernameBusy(String username);
    Boolean isEmailBusy(String email);
    Boolean isPhoneNumberBusy(String phoneNumber);
    Boolean isRestorePasswordAllowed(String email) throws UserNotFoundException;

}
