package by.minilooth.diploma.dto.spareparts.manufacturer.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.manufacturer.ProcessManufacturerDto;
import by.minilooth.diploma.models.spareparts.manufacturer.ProcessManufacturer;
import org.springframework.stereotype.Component;

@Component
public class ProcessManufacturerMapper extends AbstractMapper<ProcessManufacturer, ProcessManufacturerDto> {

    public ProcessManufacturerMapper() {
        super(ProcessManufacturer.class, ProcessManufacturerDto.class);
    }

}
