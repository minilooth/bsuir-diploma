package by.minilooth.diploma.service.stores.impl;

import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.common.enums.StoreSort;
import by.minilooth.diploma.models.bean.keys.AvailabilityKey;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.common.enums.SortDirection;
import by.minilooth.diploma.common.enums.StoreType;
import by.minilooth.diploma.models.stores.ProcessStore;
import by.minilooth.diploma.models.stores.StoreFilter;
import by.minilooth.diploma.models.stores.StoreList;
import by.minilooth.diploma.repository.stores.StoreRepository;
import by.minilooth.diploma.service.spareparts.SparePartService;
import by.minilooth.diploma.service.stores.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Transactional
@Service
public class StoreServiceImpl implements StoreService {

    @Autowired private StoreRepository storeRepository;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Store store) {
        storeRepository.save(store);
    }

    @Override
    public Store save(ProcessStore processStore) {
        Store store = Store.builder()
                .name(processStore.getName())
                .type(processStore.getType())
                .address(processStore.getAddress())
                .image(processStore.getImage())
                .build();

        Set<Availability> availabilities = sparePartService.getAll().stream().map(p -> Availability.builder()
                .id(AvailabilityKey.builder()
                        .storeId(store.getId())
                        .sparePartId(p.getId())
                        .build())
                .sparePart(p)
                .store(store)
                .quantity(0L)
                .build()
        ).collect(Collectors.toSet());

        store.setAvailabilities(availabilities);
        save(store);
        return store;
    }

    @Override
    public Store update(ProcessStore processStore, Long id) throws StoreNotFoundException {
        Store store = getById(id);

        store.setName(processStore.getName());
        store.setType(processStore.getType());
        store.setAddress(processStore.getAddress());
        store.setImage(processStore.getImage());

        save(store);
        return store;
    }

    @Override
    public void delete(Store store) {
        storeRepository.delete(store);
    }

    @Override
    public Store delete(Long id) throws StoreNotFoundException {
        Store store = getById(id);
        delete(store);
        return store;
    }

    @Override
    public Store getById(Long id) throws StoreNotFoundException {
        return storeRepository.findById(id).orElseThrow(() -> new StoreNotFoundException(id));
    }

    @Override
    public List<Store> getAll() {
        return storeRepository.findAll();
    }

    @Override
    public StoreList getAll(StoreFilter filter) {
        Integer page = filter.getPage();
        StoreSort storeSort = filter.getSort();
        SortDirection sortDirection = filter.getSortDirection();

        Comparator<Store> comparator = getComparator(storeSort, sortDirection);

        Stream<Store> storeStream = getAll().stream();

        if (Objects.nonNull(comparator)) {
            storeStream = storeStream.sorted(comparator);
        }

        StoreType storeType = filter.getType();
        if (Objects.nonNull(storeType)) {
            storeStream = storeStream.filter(s -> s.getType().equals(storeType));
        }

        String name = filter.getSearch();
        if (Objects.nonNull(name) && !name.isEmpty()) {
            storeStream = storeStream.filter(s -> s.getName().startsWith(name));
        }

        Long addressId = filter.getAddressId();
        if (Objects.nonNull(addressId)) {
            storeStream = storeStream.filter(s -> s.getAddress().getId().equals(addressId));
        }

        List<Store> stores = storeStream.collect(Collectors.toList());
        Integer count = stores.size();

        stores = stores.stream().skip((Objects.nonNull(page) ? page - 1 : 0) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
                .collect(Collectors.toList());

        StoreList storeList = StoreList.builder()
                .stores(stores)
                .build();

        storeList.setPages(count == 0 ? 1 : (count % ITEMS_PER_PAGE == 0
                ? (count / ITEMS_PER_PAGE)
                : ((count / ITEMS_PER_PAGE) + 1L)));

        return storeList;
    }

    private Comparator<Store> getComparator(StoreSort storeSort) {
        if (Objects.nonNull(storeSort)) {
            switch (storeSort) {
                case STORE_TYPE:
                    return Comparator.comparing(Store::getType);
                case NAME:
                    return Comparator.comparing(Store::getName);
                case ADDRESS:
                    return Comparator.comparing(Store::getAddress);
                default:
                    return null;
            }
        }
        return null;
    }

    private Comparator<Store> getComparator(StoreSort storeSort, SortDirection sortDirection) {
        Comparator<Store> comparator = getComparator(storeSort);

        if (Objects.nonNull(sortDirection) && Objects.nonNull(comparator)) {
            switch (sortDirection) {
                case DESC:
                    return comparator.reversed();
                case ASC:
                default:
                    return comparator;
            }
        }

        return comparator;
    }

    @Override
    public Boolean existsByAddress(Address address) {
        return storeRepository.existsByAddress(address);
    }
}
