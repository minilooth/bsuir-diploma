package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.RoleDto;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class RoleMapper extends AbstractMapper<Role, RoleDto> {

    public RoleMapper() {
        super(Role.class, RoleDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Role.class, RoleDto.class);
    }


}
