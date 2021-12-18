package by.minilooth.diploma.controller.stores;

import by.minilooth.diploma.dto.stores.ProcessStoreDto;
import by.minilooth.diploma.dto.stores.StoreDto;
import by.minilooth.diploma.dto.stores.StoreFilterDto;
import by.minilooth.diploma.dto.stores.StoreListDto;
import by.minilooth.diploma.dto.stores.mapper.ProcessStoreMapper;
import by.minilooth.diploma.dto.stores.mapper.StoreFilterMapper;
import by.minilooth.diploma.dto.stores.mapper.StoreListMapper;
import by.minilooth.diploma.dto.stores.mapper.StoreMapper;
import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.stores.ProcessStore;
import by.minilooth.diploma.models.stores.StoreFilter;
import by.minilooth.diploma.models.stores.StoreList;
import by.minilooth.diploma.service.stores.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/store")
@RestController
@Validated
public class StoreController {

    @Autowired private StoreService storeService;
    @Autowired private StoreMapper storeMapper;
    @Autowired private ProcessStoreMapper processStoreMapper;
    @Autowired private StoreFilterMapper storeFilterMapper;
    @Autowired private StoreListMapper storeListMapper;

    @PostMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll(@RequestBody StoreFilterDto storeFilterDto) {
        StoreFilter storeFilter = storeFilterMapper.toEntity(storeFilterDto);
        StoreList storeList = storeService.getAll(storeFilter);
        StoreListDto storeListDto = storeListMapper.toDto(storeList);
        return ResponseEntity.ok(storeListDto);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody @Valid ProcessStoreDto processStoreDto) {
        ProcessStore processStore = processStoreMapper.toEntity(processStoreDto);
        Store store = storeService.save(processStore);
        StoreDto storeDto = storeMapper.toDto(store);
        return ResponseEntity.ok(storeDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@RequestBody @Valid ProcessStoreDto processStoreDto, @PathVariable("id") Long id)
            throws StoreNotFoundException {
        ProcessStore processStore = processStoreMapper.toEntity(processStoreDto);
        Store store = storeService.update(processStore, id);
        StoreDto storeDto = storeMapper.toDto(store);
        return ResponseEntity.ok(storeDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws StoreNotFoundException {
        Store store = storeService.delete(id);
        StoreDto storeDto = storeMapper.toDto(store);
        return ResponseEntity.ok(storeDto);
    }

}
