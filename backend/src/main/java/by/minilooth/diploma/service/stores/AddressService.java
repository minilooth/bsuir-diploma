package by.minilooth.diploma.service.stores;

import by.minilooth.diploma.exception.stores.AddressNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {

    void save(Address address);
    void delete(Address address);
    void deleteById(Long id) throws AddressNotFoundException;
    Address getById(Long id) throws AddressNotFoundException;
    List<Address> getAll();
    List<Address> getAll(Optional<String> address);

}
