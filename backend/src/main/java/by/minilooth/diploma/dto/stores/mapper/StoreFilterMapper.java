package by.minilooth.diploma.dto.stores.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.stores.StoreFilterDto;
import by.minilooth.diploma.models.stores.StoreFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StoreFilterMapper extends AbstractMapper<StoreFilter, StoreFilterDto> {

    public StoreFilterMapper() {
        super(StoreFilter.class, StoreFilterDto.class);
    }

}
