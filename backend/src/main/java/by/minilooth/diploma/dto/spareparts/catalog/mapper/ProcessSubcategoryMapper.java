package by.minilooth.diploma.dto.spareparts.catalog.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.catalog.ProcessSubcategoryDto;
import by.minilooth.diploma.models.spareparts.catalog.ProcessSubcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessSubcategoryMapper extends AbstractMapper<ProcessSubcategory, ProcessSubcategoryDto> {

    @Autowired private CategoryMapper categoryMapper;

    public ProcessSubcategoryMapper() {
        super(ProcessSubcategory.class, ProcessSubcategoryDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessSubcategoryDto.class, ProcessSubcategory.class)
                .addMappings(m -> {
                    m.skip(ProcessSubcategory::setCategory);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessSubcategoryDto source, ProcessSubcategory destination) {
        destination.setCategory(categoryMapper.toEntity(source.getCategory()));
    }

}
