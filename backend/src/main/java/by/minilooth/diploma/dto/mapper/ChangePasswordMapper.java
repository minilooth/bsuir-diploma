package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.ChangePasswordDto;
import by.minilooth.diploma.models.ChangePassword;
import org.springframework.stereotype.Component;

@Component
public class ChangePasswordMapper extends AbstractMapper<ChangePassword, ChangePasswordDto> {

    public ChangePasswordMapper() {
        super(ChangePassword.class, ChangePasswordDto.class);
    }

}
