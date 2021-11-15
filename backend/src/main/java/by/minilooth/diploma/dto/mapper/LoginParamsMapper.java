package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.LoginParamsDto;
import by.minilooth.diploma.models.LoginParams;
import org.springframework.stereotype.Component;

@Component
public class LoginParamsMapper extends AbstractMapper<LoginParams, LoginParamsDto> {

    public LoginParamsMapper() {
        super(LoginParams.class, LoginParamsDto.class);
    }

}
