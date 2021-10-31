package by.minilooth.diploma.service.stores;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.stores.ProcessStore;
import by.minilooth.diploma.models.stores.StoreFilter;
import by.minilooth.diploma.models.stores.StoreList;

import java.util.List;
import java.util.Optional;

public interface StoreService {

    void save(Store store);
    Store save(ProcessStore processStore);
    Store update(ProcessStore processStore, Long id) throws StoreNotFoundException;
    void delete(Store store);
    Store delete(Long id) throws StoreNotFoundException;
    Optional<Store> getById(Long id);
    StoreList getAll(StoreFilter storeFilter);
    List<Store> getAll();
    Boolean existsByAddress(Address address);

}
