package by.minilooth.diploma.service.common.impl;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.service.common.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender emailSender;

    @Override
    public void sendConfirmRegisterMain(User user, String password, ConfirmationToken confirmationToken) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject("Complete Registration!");
        message.setFrom("no-reply@minilooth.by");
        message.setText("To confirm your e-mail, please click here : " +
                "http://localhost:3000/confirm-account?token=" + confirmationToken.getToken() + '\n' +
                "Your username: " + user.getUsername() +
                "Your password: " + password);

        emailSender.send(message);
    }

    @Override
    public void sendRestorePasswordMail(User user, String password) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject("Restore Password");
        message.setFrom("no-reply@minilooth.by");
        message.setText("Your password: " + password);

        emailSender.send(message);
    }

    @Override
    public void sendConfirmEmailMail(User user, ConfirmationToken confirmationToken) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject("Complete Registration!");
        message.setFrom("no-reply@minilooth.by");
        message.setText("To confirm your e-mail, please click here : " +
                "http://localhost:3000/confirm-account?token=" + confirmationToken.getToken());

        emailSender.send(message);
    }

}
