package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.models.api.AbstractFilter;
import by.minilooth.diploma.models.bean.StoreSort;
import by.minilooth.diploma.models.enums.StoreType;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StoreFilterDto extends AbstractFilter<StoreSort> implements BaseDto {

    private StoreType storeType;
    private Long addressId;

}
