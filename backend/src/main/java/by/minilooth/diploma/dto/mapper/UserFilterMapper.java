package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.UserFilterDto;
import by.minilooth.diploma.models.UserFilter;
import org.springframework.stereotype.Component;

@Component
public class UserFilterMapper extends AbstractMapper<UserFilter, UserFilterDto> {

    public UserFilterMapper() {
        super(UserFilter.class, UserFilterDto.class);
    }

}
