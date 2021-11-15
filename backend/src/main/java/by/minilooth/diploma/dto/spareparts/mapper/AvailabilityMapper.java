package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.spareparts.AvailabilityDto;
import by.minilooth.diploma.dto.stores.mapper.StoreMapper;
import by.minilooth.diploma.models.bean.stores.Availability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AvailabilityMapper extends AbstractMapper<Availability, AvailabilityDto> {

    @Autowired private StoreMapper storeMapper;
    @Autowired private AvailabilityKeyMapper availabilityKeyMapper;

    public AvailabilityMapper() {
        super(Availability.class, AvailabilityDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Availability.class, AvailabilityDto.class)
                .addMappings(m -> {
                    m.skip(AvailabilityDto::setStore);
                    m.skip(AvailabilityDto::setId);
                }).setPostConverter(toDtoConverter());
        mapper.createTypeMap(AvailabilityDto.class, Availability.class)
                .addMappings(m -> {
                    m.skip(Availability::setStore);
                    m.skip(Availability::setId);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Availability source, AvailabilityDto destination) {
        destination.setStore(storeMapper.toDto(source.getStore()));
        destination.setId(availabilityKeyMapper.toDto(source.getId()));
    }

    @Override
    public void mapSpecificFields(AvailabilityDto source, Availability destination) {
        destination.setStore(storeMapper.toEntity(source.getStore()));
        destination.setId(availabilityKeyMapper.toEntity(source.getId()));
    }

}
