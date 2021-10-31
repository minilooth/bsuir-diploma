package by.minilooth.diploma.dto.spareparts.catalog.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.catalog.SubcategoryDto;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class SubcategoryMapper extends AbstractMapper<Subcategory, SubcategoryDto> {

    @Autowired private CategoryMapper categoryMapper;

    public SubcategoryMapper() {
        super(Subcategory.class, SubcategoryDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Subcategory.class, SubcategoryDto.class)
                .addMappings(m -> {
                    m.skip(SubcategoryDto::setCategory);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(SubcategoryDto.class, Subcategory.class)
                .addMappings(m -> {
                    m.skip(Subcategory::setCategory);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Subcategory source, SubcategoryDto destination) {
        destination.setCategory(categoryMapper.toDto(source.getCategory()));
    }

    @Override
    public void mapSpecificFields(SubcategoryDto source, Subcategory destination) {
        destination.setCategory(categoryMapper.toEntity(source.getCategory()));
    }

}
