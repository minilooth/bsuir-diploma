package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.models.bean.users.ConfirmationToken;
import by.minilooth.diploma.repository.users.ConfirmationTokenRepository;
import by.minilooth.diploma.service.users.ConfirmationTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public void save(ConfirmationToken confirmationToken) {
        confirmationTokenRepository.save(confirmationToken);
    }

    @Override
    public void delete(ConfirmationToken confirmationToken) {
        confirmationTokenRepository.delete(confirmationToken);
    }

    @Override
    public ConfirmationToken getByToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

}
