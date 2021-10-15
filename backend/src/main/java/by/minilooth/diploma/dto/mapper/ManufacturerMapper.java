package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.ManufacturerDto;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import org.springframework.stereotype.Component;

@Component
public class ManufacturerMapper extends AbstractMapper<Manufacturer, ManufacturerDto> {

    public ManufacturerMapper() {
        super(Manufacturer.class, ManufacturerDto.class);
    }

}
