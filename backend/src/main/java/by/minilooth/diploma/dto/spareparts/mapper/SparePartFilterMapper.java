package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.SparePartFilterDto;
import by.minilooth.diploma.models.spareparts.SparePartFilter;
import org.springframework.stereotype.Component;

@Component
public class SparePartFilterMapper extends AbstractMapper<SparePartFilter, SparePartFilterDto> {

    public SparePartFilterMapper() {
        super(SparePartFilter.class, SparePartFilterDto.class);
    }

}
