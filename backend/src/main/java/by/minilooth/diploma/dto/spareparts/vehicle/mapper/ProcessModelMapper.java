package by.minilooth.diploma.dto.spareparts.vehicle.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.ProcessModelDto;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessModelMapper extends AbstractMapper<ProcessModel, ProcessModelDto> {

    @Autowired private MakeMapper makeMapper;

    public ProcessModelMapper() {
        super(ProcessModel.class, ProcessModelDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessModelDto.class, ProcessModel.class)
                .addMappings(m -> {
                    m.skip(ProcessModel::setMake);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessModelDto source, ProcessModel destination) {
        destination.setMake(makeMapper.toEntity(source.getMake()));
    }
}
