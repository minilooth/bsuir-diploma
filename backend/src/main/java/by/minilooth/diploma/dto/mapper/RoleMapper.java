package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.RoleDto;
import by.minilooth.diploma.service.users.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Objects;

@Component
public class RoleMapper extends AbstractMapper<Role, RoleDto> {

    @Autowired
    private RoleService roleService;

    public RoleMapper() {
        super(Role.class, RoleDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Role.class, RoleDto.class);
        mapper.createTypeMap(RoleDto.class, Role.class).addMappings(m -> {
            m.skip(Role::setId);
            m.skip(Role::setAuthority);
            m.skip(Role::setCreatedAt);
            m.skip(Role::setUpdatedAt);
        }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(RoleDto source, Role destination) {
        Role role = roleService.getByAuthority(source.getAuthority()).orElse(null);
        if (Objects.nonNull(role)) {
            destination.setId(role.getId());
            destination.setAuthority(role.getAuthority());
            destination.setUpdatedAt(role.getUpdatedAt());
            destination.setCreatedAt(role.getCreatedAt());
        }
    }
}
