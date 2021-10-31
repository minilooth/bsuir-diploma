package by.minilooth.diploma.dto.spareparts.characteristics.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.characteristics.ModificationDto;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import org.springframework.stereotype.Component;

@Component
public class ModificationMapper extends AbstractMapper<Modification, ModificationDto> {

    public ModificationMapper() {
        super(Modification.class, ModificationDto.class);
    }

}
