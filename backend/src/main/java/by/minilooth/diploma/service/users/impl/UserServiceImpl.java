package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.repository.users.UserRepository;
import by.minilooth.diploma.service.users.ConfirmationTokenService;
import by.minilooth.diploma.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import by.minilooth.diploma.models.bean.users.User;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ConfirmationTokenService confirmationTokenService;
    private final UserRepository userRepository;

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void confirmEmail(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.getByToken(token);

        User user = confirmationToken.getUser();
        user.setIsEmailConfirmed(true);
        save(user);

        confirmationTokenService.delete(confirmationToken);
    }

}
