package by.minilooth.diploma.dto.spareparts.vehicle.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.GenerationDto;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class GenerationMapper extends AbstractMapper<Generation, GenerationDto> {

    @Autowired private ModelBeanMapper modelBeanMapper;

    public GenerationMapper() {
        super(Generation.class, GenerationDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Generation.class, GenerationDto.class)
                .addMappings(m -> {
                    m.skip(GenerationDto::setModel);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(GenerationDto.class, Generation.class)
                .addMappings(m -> {
                    m.skip(Generation::setModel);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Generation source, GenerationDto destination) {
        destination.setModel(modelBeanMapper.toDto(source.getModel()));
    }

    @Override
    public void mapSpecificFields(GenerationDto source, Generation destination) {
        destination.setModel(modelBeanMapper.toEntity(source.getModel()));
    }

}
