package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.ProcessUserDto;
import by.minilooth.diploma.models.ProcessUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessUserMapper extends AbstractMapper<ProcessUser, ProcessUserDto> {

    @Autowired private ImageMapper imageMapper;
    @Autowired private RoleMapper roleMapper;

    public ProcessUserMapper() {
        super(ProcessUser.class, ProcessUserDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessUserDto.class, ProcessUser.class)
                .addMappings(m -> {
                    m.skip(ProcessUser::setAvatar);
                    m.skip(ProcessUser::setRole);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessUserDto source, ProcessUser destination) {
        destination.setAvatar(imageMapper.toEntity(source.getAvatar()));
        destination.setRole(roleMapper.toEntity(source.getRole()));
    }
}
