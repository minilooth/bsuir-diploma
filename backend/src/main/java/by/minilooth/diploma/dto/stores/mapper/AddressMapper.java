package by.minilooth.diploma.dto.stores.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.stores.AddressDto;
import by.minilooth.diploma.models.bean.stores.Address;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AddressMapper extends AbstractMapper<Address, AddressDto> {

    protected AddressMapper() {
        super(Address.class, AddressDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Address.class, AddressDto.class)
                .setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(Address source, AddressDto destination) {
        destination.setFull(source.getFullAddress());
    }

}
