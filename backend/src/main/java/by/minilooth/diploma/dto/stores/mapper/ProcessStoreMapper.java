package by.minilooth.diploma.dto.stores.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.mapper.ImageMapper;
import by.minilooth.diploma.dto.stores.ProcessStoreDto;
import by.minilooth.diploma.models.stores.ProcessStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessStoreMapper extends AbstractMapper<ProcessStore, ProcessStoreDto> {

    @Autowired private AddressMapper addressMapper;
    @Autowired private ImageMapper imageMapper;

    public ProcessStoreMapper() {
        super(ProcessStore.class, ProcessStoreDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessStoreDto.class, ProcessStore.class)
                .addMappings(m -> {
                    m.skip(ProcessStore::setAddress);
                    m.skip(ProcessStore::setImage);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessStoreDto source, ProcessStore destination) {
        destination.setAddress(addressMapper.toEntity(source.getAddress()));
        destination.setImage(imageMapper.toEntity(source.getImage()));
    }
}
