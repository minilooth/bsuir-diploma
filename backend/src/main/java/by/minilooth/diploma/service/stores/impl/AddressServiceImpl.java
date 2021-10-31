package by.minilooth.diploma.service.stores.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.stores.AddressNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.stores.ProcessAddress;
import by.minilooth.diploma.repository.stores.AddressRepository;
import by.minilooth.diploma.service.stores.AddressService;
import by.minilooth.diploma.service.stores.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    @Autowired private AddressRepository addressRepository;
    @Autowired private StoreService storeService;

    @Override
    public void save(Address address) {
        addressRepository.save(address);
    }

    @Override
    public Address save(ProcessAddress processAddress) {
        Address address = Address.builder()
                .house(processAddress.getHouse())
                .housing(processAddress.getHousing())
                .room(processAddress.getRoom())
                .street(processAddress.getStreet())
                .build();
        save(address);
        return address;
    }

    @Override
    public Address update(ProcessAddress processAddress, Long id) throws AddressNotFoundException {
        Address address = getById(id).orElseThrow(() -> new AddressNotFoundException(id));

        address.setHouse(processAddress.getHouse());
        address.setHousing(processAddress.getHousing());
        address.setRoom(processAddress.getRoom());
        address.setStreet(processAddress.getStreet());

        save(address);
        return address;
    }

    @Override
    public void delete(Address address) {
        addressRepository.delete(address);
    }

    @Override
    public Address delete(Long id) throws AddressNotFoundException, ActionIsImpossibleException {
        Address address = getById(id).orElseThrow(() -> new AddressNotFoundException(id));

        if (storeService.existsByAddress(address)) {
            throw new ActionIsImpossibleException("Невозможно удалить адрес который указан в магазине/складе");
        }

        delete(address);
        return address;
    }

    @Override
    public Optional<Address> getById(Long id) throws AddressNotFoundException {
        return addressRepository.findById(id);
    }

    @Override
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @Override
    public List<Address> getAll(Optional<String> address) {
        List<Address> addresses = getAll();
        return address.map(s -> addresses.stream().filter(a -> removeUnnecessaryData(a.getFullAddress())
                .contains(removeUnnecessaryData(s))).collect(Collectors.toList())).orElse(null);
    }

    private String removeUnnecessaryData(String string) {
        return string
            .replace("ул.", "")
            .replace("д.", "")
            .replace("к.", "")
            .replace("кв.", "")
            .replace(".", "")
            .replace(",", "")
            .replace(" ", "");
    }
}
