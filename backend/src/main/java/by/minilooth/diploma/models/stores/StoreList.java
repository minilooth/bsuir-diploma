package by.minilooth.diploma.models.stores;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.stores.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreList implements BaseEntity {

    private List<Store> stores;
    private Long pages;

}
