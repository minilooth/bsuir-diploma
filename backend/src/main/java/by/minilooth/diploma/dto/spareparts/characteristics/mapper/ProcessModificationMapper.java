package by.minilooth.diploma.dto.spareparts.characteristics.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.characteristics.ProcessModificationDto;
import by.minilooth.diploma.models.spareparts.characteristic.ProcessModification;
import org.springframework.stereotype.Component;

@Component
public class ProcessModificationMapper extends AbstractMapper<ProcessModification, ProcessModificationDto> {

    public ProcessModificationMapper() {
        super(ProcessModification.class, ProcessModificationDto.class);
    }

}
