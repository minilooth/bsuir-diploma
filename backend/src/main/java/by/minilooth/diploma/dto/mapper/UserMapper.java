package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.UserDto;
import by.minilooth.diploma.dto.cart.mapper.CartMapper;
import by.minilooth.diploma.models.bean.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.stream.Collectors;

@Component
public class UserMapper extends AbstractMapper<User, UserDto> {

    @Autowired private RoleMapper roleMapper;
    @Autowired private ImageMapper imageMapper;
    @Autowired private CartMapper cartMapper;

    public UserMapper() {
        super(User.class, UserDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(User.class, UserDto.class)
                .addMappings(m -> {
                    m.skip(UserDto::setRoles);
                    m.skip(UserDto::setAvatar);
                    m.skip(UserDto::setCart);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(UserDto.class, User.class)
                .addMappings(m -> {
                    m.skip(User::setAuthorities);
                    m.skip(User::setAvatar);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(User source, UserDto destination) {
        destination.setAvatar(imageMapper.toDto(source.getAvatar()));
        destination.setRoles(roleMapper.toDto(source.getAuthorities()));
        destination.setCart(cartMapper.toDto(source.getCart()));
    }

    @Override
    public void mapSpecificFields(UserDto source, User destination) {
        destination.setAuthorities(roleMapper.toEntity(source.getRoles(), Collectors.toSet()));
        destination.setAvatar(imageMapper.toEntity(source.getAvatar()));
    }

}
