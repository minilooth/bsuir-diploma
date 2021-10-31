package by.minilooth.diploma.dto.spareparts.vehicle.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.ProcessGenerationDto;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessGeneration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessGenerationMapper extends AbstractMapper<ProcessGeneration, ProcessGenerationDto> {

    @Autowired private ModelBeanMapper modelBeanMapper;

    public ProcessGenerationMapper() {
        super(ProcessGeneration.class, ProcessGenerationDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessGenerationDto.class, ProcessGeneration.class)
                .addMappings(m -> {
                    m.skip(ProcessGeneration::setModel);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessGenerationDto source, ProcessGeneration destination) {
        destination.setModel(modelBeanMapper.toEntity(source.getModel()));
    }
}
