package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.CharacteristicDto;
import by.minilooth.diploma.dto.spareparts.characteristics.mapper.ModificationMapper;
import by.minilooth.diploma.models.bean.spareparts.Characteristic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class CharacteristicMapper extends AbstractMapper<Characteristic, CharacteristicDto> {

    @Autowired private ModificationMapper modificationMapper;
    @Autowired private CharacteristicKeyMapper characteristicKeyMapper;

    public CharacteristicMapper() {
        super(Characteristic.class, CharacteristicDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Characteristic.class, CharacteristicDto.class)
                .addMappings(m -> {
                    m.skip(CharacteristicDto::setModification);
                    m.skip(CharacteristicDto::setId);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(CharacteristicDto.class, Characteristic.class)
                .addMappings(m -> {
                    m.skip(Characteristic::setModification);
                    m.skip(Characteristic::setId);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Characteristic source, CharacteristicDto destination) {
        destination.setModification(modificationMapper.toDto(source.getModification()));
        destination.setId(characteristicKeyMapper.toDto(source.getId()));
    }

    @Override
    public void mapSpecificFields(CharacteristicDto source, Characteristic destination) {
        destination.setModification(modificationMapper.toEntity(source.getModification()));
        destination.setId(characteristicKeyMapper.toEntity(source.getId()));
    }

}
