package by.minilooth.diploma.service.stores.impl;

import by.minilooth.diploma.exception.stores.AddressNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.repository.stores.AddressRepository;
import by.minilooth.diploma.service.stores.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public void save(Address address) {
        addressRepository.save(address);
    }

    @Override
    public void delete(Address address) {
        addressRepository.delete(address);
    }

    @Override
    public void deleteById(Long id) throws AddressNotFoundException {
        delete(getById(id));
    }

    @Override
    public Address getById(Long id) throws AddressNotFoundException {
        return addressRepository.findById(id).orElseThrow(() -> new AddressNotFoundException(id));
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
