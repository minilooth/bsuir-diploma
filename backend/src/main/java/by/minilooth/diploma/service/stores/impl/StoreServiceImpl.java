package by.minilooth.diploma.service.stores.impl;

import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.repository.stores.StoreRepository;
import by.minilooth.diploma.service.stores.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;

    @Override
    public void save(Store store) {
        storeRepository.save(store);
    }

    @Override
    public void delete(Store store) {
        storeRepository.delete(store);
    }

    @Override
    public Store getById(Long id) throws StoreNotFoundException {
        return storeRepository.findById(id).orElseThrow(() -> new StoreNotFoundException(id));
    }

    @Override
    public List<Store> getAll() {
        return storeRepository.findAll();
    }
}
