package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.RestorePasswordParamsDto;
import by.minilooth.diploma.models.RestorePasswordParams;
import org.springframework.stereotype.Component;

@Component
public class RestorePasswordParamsMapper extends AbstractMapper<RestorePasswordParams, RestorePasswordParamsDto> {

    public RestorePasswordParamsMapper() {
        super(RestorePasswordParams.class, RestorePasswordParamsDto.class);
    }

}
