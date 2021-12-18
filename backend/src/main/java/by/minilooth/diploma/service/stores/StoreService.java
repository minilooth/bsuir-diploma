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

    Long ITEMS_PER_PAGE = 9L;

    void save(Store store);
    Store save(ProcessStore processStore);
    Store update(ProcessStore processStore, Long id) throws StoreNotFoundException;
    void delete(Store store);
    Store delete(Long id) throws StoreNotFoundException;
    Store getById(Long id) throws StoreNotFoundException;
    StoreList getAll(StoreFilter storeFilter);
    List<Store> getAll();
    Boolean existsByAddress(Address address);

}
