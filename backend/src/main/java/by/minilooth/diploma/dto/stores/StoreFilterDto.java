package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.common.api.AbstractFilter;
import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.common.enums.StoreSort;
import by.minilooth.diploma.common.enums.StoreType;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StoreFilterDto extends AbstractFilter<StoreSort> implements BaseDto {

    private StoreType storeType;
    private Long addressId;

}
