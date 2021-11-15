package by.minilooth.diploma.dto.spareparts.catalog.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.catalog.ProcessCategoryDto;
import by.minilooth.diploma.models.spareparts.catalog.ProcessCategory;
import org.springframework.stereotype.Component;

@Component
public class ProcessCategoryMapper extends AbstractMapper<ProcessCategory, ProcessCategoryDto> {

    public ProcessCategoryMapper() {
        super(ProcessCategory.class, ProcessCategoryDto.class);
    }

}
