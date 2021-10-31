package by.minilooth.diploma.service.stores;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.stores.AddressNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.stores.ProcessAddress;

import java.util.List;
import java.util.Optional;

public interface AddressService {

    void save(Address address);
    Address save(ProcessAddress processAddress);
    Address update(ProcessAddress processAddress, Long id) throws AddressNotFoundException;
    void delete(Address address);
    Address delete(Long id) throws AddressNotFoundException, ActionIsImpossibleException;
    Optional<Address> getById(Long id) throws AddressNotFoundException;
    List<Address> getAll();
    List<Address> getAll(Optional<String> address);

}
