package by.minilooth.diploma.service.common.impl;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.service.common.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired private JavaMailSender emailSender;

    @Value("${app.production}")
    private Boolean production;

    @Override
    public void sendConfirmRegisterMain(User user, String password, ConfirmationToken confirmationToken) {
        if (production) {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(user.getEmail());
            message.setSubject("Успешная регистрация!");
            message.setFrom("no-reply@minilooth.by");
            message.setText("Чтобы подтвердить ваш адрес электронной почты, пожалуйста перейдите по ссылке: " +
                    "http://localhost:3000/confirm-account?token=" + confirmationToken.getToken() + '\n' +
                    "Ваши данные для входа:\n" +
                    "Имя пользователя: " + user.getUsername() + "\n" +
                    "Пароль: " + password);

            emailSender.send(message);
        }
    }

    @Override
    public void sendRestorePasswordMail(User user, String password) {
        if (production) {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(user.getEmail());
            message.setSubject("Восстановление пароля");
            message.setFrom("no-reply@minilooth.by");
            message.setText("Ваш новый пароль: " + password);

            emailSender.send(message);
        }
    }

    @Override
    public void sendConfirmEmailMail(User user, ConfirmationToken confirmationToken) {
        if (production) {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(user.getEmail());
            message.setSubject("Успешная регистрация!");
            message.setFrom("no-reply@minilooth.by");
            message.setText("Чтобы подтвердить ваш адрес электронной почты, пожалуйста перейдите по ссылке: " +
                    "http://localhost:3000/confirm-account?token=" + confirmationToken.getToken());

            emailSender.send(message);
        }
    }

}
