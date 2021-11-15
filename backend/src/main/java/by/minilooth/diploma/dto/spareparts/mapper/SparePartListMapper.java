package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.SparePartListDto;
import by.minilooth.diploma.models.spareparts.SparePartList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class SparePartListMapper extends AbstractMapper<SparePartList, SparePartListDto> {

    @Autowired private SparePartMapper sparePartMapper;

    public SparePartListMapper() {
        super(SparePartList.class, SparePartListDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(SparePartList.class, SparePartListDto.class)
                .addMappings(m -> {
                    m.skip(SparePartListDto::setSpareParts);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(SparePartList source, SparePartListDto destination) {
        destination.setSpareParts(sparePartMapper.toDto(source.getSpareParts()));
    }

}
