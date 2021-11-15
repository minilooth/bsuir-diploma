package by.minilooth.diploma.dto.stores.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.mapper.ImageMapper;
import by.minilooth.diploma.dto.stores.StoreDto;
import by.minilooth.diploma.models.bean.stores.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StoreMapper extends AbstractMapper<Store, StoreDto> {

    @Autowired private AddressMapper addressMapper;
    @Autowired private ImageMapper imageMapper;

    public StoreMapper() {
        super(Store.class, StoreDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Store.class, StoreDto.class)
                .addMappings(m -> {
                    m.skip(StoreDto::setAddress);
                    m.skip(StoreDto::setImage);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(Store source, StoreDto destination) {
        destination.setAddress(addressMapper.toDto(source.getAddress()));
        destination.setImage(imageMapper.toDto(source.getImage()));
    }
}
