package by.minilooth.diploma.dto.stores.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.stores.StoreListDto;
import by.minilooth.diploma.models.stores.StoreList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StoreListMapper extends AbstractMapper<StoreList, StoreListDto> {

    @Autowired private StoreMapper storeMapper;

    public StoreListMapper() {
        super(StoreList.class, StoreListDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(StoreList.class, StoreListDto.class)
                .addMappings(m -> {
                    m.skip(StoreListDto::setStores);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(StoreList source, StoreListDto destination) {
        destination.setStores(storeMapper.toDto(source.getStores()));
    }
}
