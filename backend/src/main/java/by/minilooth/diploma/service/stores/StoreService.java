package by.minilooth.diploma.service.stores;

import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.stores.Store;

import java.util.List;

public interface StoreService {

    void save(Store store);
    void delete(Store store);
    Store getById(Long id) throws StoreNotFoundException;
    List<Store> getAll();

}
