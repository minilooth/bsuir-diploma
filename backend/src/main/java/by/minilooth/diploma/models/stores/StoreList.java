package by.minilooth.diploma.models.stores;

import by.minilooth.diploma.common.api.AbstractEntityList;
import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.stores.Store;
import lombok.*;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreList extends AbstractEntityList implements BaseEntity {

    private List<Store> stores;

}
