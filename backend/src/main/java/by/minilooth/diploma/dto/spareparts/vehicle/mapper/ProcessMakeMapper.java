package by.minilooth.diploma.dto.spareparts.vehicle.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.ProcessMakeDto;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessMake;
import org.springframework.stereotype.Component;

@Component
public class ProcessMakeMapper extends AbstractMapper<ProcessMake, ProcessMakeDto> {

    public ProcessMakeMapper() {
        super(ProcessMake.class, ProcessMakeDto.class);
    }

}
