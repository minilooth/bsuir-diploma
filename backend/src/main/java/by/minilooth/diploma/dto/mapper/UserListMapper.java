package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.UserListDto;
import by.minilooth.diploma.models.UserList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class UserListMapper extends AbstractMapper<UserList, UserListDto> {

    @Autowired private UserMapper userMapper;

    public UserListMapper() {
        super(UserList.class, UserListDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(UserList.class, UserListDto.class)
                .addMappings(m -> {
                    m.skip(UserListDto::setUsers);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(UserList source, UserListDto destination) {
        destination.setUsers(userMapper.toDto(source.getUsers()));
    }

}
