package by.minilooth.diploma.dto.spareparts.vehicle.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.ModelDto;
import by.minilooth.diploma.models.bean.vehicle.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ModelBeanMapper extends AbstractMapper<Model, ModelDto> {

    @Autowired private MakeMapper makeMapper;

    public ModelBeanMapper() {
        super(Model.class, ModelDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Model.class, ModelDto.class)
                .addMappings(m -> {
                    m.skip(ModelDto::setMake);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(ModelDto.class, Model.class)
                .addMappings(m -> {
                    m.skip(Model::setMake);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Model source, ModelDto destination) {
        destination.setMake(makeMapper.toDto(source.getMake()));
    }

    @Override
    public void mapSpecificFields(ModelDto source, Model destination) {
        destination.setMake(makeMapper.toEntity(source.getMake()));
    }

}
