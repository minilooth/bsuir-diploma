package by.minilooth.diploma.models.stores;

import by.minilooth.diploma.common.api.AbstractFilter;
import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.common.enums.StoreSort;
import by.minilooth.diploma.common.enums.StoreType;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StoreFilter extends AbstractFilter<StoreSort> implements BaseEntity {

    private StoreType type;
    private Long addressId;

}
