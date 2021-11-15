package by.minilooth.diploma.dto.spareparts.catalog.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.catalog.GroupDto;
import by.minilooth.diploma.models.bean.catalog.Group;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class GroupMapper extends AbstractMapper<Group, GroupDto> {

    @Autowired private SubcategoryMapper subcategoryMapper;

    public GroupMapper() {
        super(Group.class, GroupDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Group.class, GroupDto.class)
                .addMappings(m -> {
                    m.skip(GroupDto::setSubcategory);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(GroupDto.class, Group.class)
                .addMappings(m -> {
                    m.skip(Group::setSubcategory);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Group source, GroupDto destination) {
        destination.setSubcategory(subcategoryMapper.toDto(source.getSubcategory()));
    }

    @Override
    public void mapSpecificFields(GroupDto source, Group destination) {
        destination.setSubcategory(subcategoryMapper.toEntity(source.getSubcategory()));
    }

}
