package by.minilooth.diploma.dto.spareparts.catalog.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.catalog.ProcessGroupDto;
import by.minilooth.diploma.models.spareparts.catalog.ProcessGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessGroupMapper extends AbstractMapper<ProcessGroup, ProcessGroupDto> {

    @Autowired private SubcategoryMapper subcategoryMapper;

    public ProcessGroupMapper() {
        super(ProcessGroup.class, ProcessGroupDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessGroupDto.class, ProcessGroup.class)
                .addMappings(m -> {
                    m.skip(ProcessGroup::setSubcategory);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessGroupDto source, ProcessGroup destination) {
        destination.setSubcategory(subcategoryMapper.toEntity(source.getSubcategory()));
    }

}
