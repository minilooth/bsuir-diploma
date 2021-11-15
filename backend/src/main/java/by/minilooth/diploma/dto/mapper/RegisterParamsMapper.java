package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.RegisterParamsDto;
import by.minilooth.diploma.models.RegisterParams;
import org.springframework.stereotype.Component;

@Component
public class RegisterParamsMapper extends AbstractMapper<RegisterParams, RegisterParamsDto> {

    public RegisterParamsMapper() {
        super(RegisterParams.class, RegisterParamsDto.class);
    }

}
