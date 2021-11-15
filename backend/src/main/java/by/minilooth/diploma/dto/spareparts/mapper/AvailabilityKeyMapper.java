package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.AvailabilityKeyDto;
import by.minilooth.diploma.models.bean.keys.AvailabilityKey;
import org.springframework.stereotype.Component;

@Component
public class AvailabilityKeyMapper extends AbstractMapper<AvailabilityKey, AvailabilityKeyDto> {

    public AvailabilityKeyMapper() {
        super(AvailabilityKey.class, AvailabilityKeyDto.class);
    }

}
