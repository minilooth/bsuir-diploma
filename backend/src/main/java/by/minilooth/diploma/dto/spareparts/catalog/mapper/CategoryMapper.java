package by.minilooth.diploma.dto.spareparts.catalog.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.catalog.CategoryDto;
import by.minilooth.diploma.models.bean.catalog.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper extends AbstractMapper<Category, CategoryDto> {

    public CategoryMapper() {
        super(Category.class, CategoryDto.class);
    }

}
