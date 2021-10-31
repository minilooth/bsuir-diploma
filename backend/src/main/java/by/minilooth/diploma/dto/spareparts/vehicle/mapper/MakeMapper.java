package by.minilooth.diploma.dto.spareparts.vehicle.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.MakeDto;
import by.minilooth.diploma.models.bean.vehicle.Make;
import org.springframework.stereotype.Component;

@Component
public class MakeMapper extends AbstractMapper<Make, MakeDto> {

    public MakeMapper() {
        super(Make.class, MakeDto.class);
    }

}
