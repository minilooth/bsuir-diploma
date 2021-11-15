package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.CharacteristicKeyDto;
import by.minilooth.diploma.models.bean.keys.CharacteristicKey;
import org.springframework.stereotype.Component;

@Component
public class CharacteristicKeyMapper extends AbstractMapper<CharacteristicKey, CharacteristicKeyDto> {

    public CharacteristicKeyMapper() {
        super(CharacteristicKey.class, CharacteristicKeyDto.class);
    }

}
