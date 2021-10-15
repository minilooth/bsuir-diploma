package by.minilooth.diploma.controller;

import by.minilooth.diploma.dto.AddressDto;
import by.minilooth.diploma.dto.mapper.AddressMapper;
import by.minilooth.diploma.exception.stores.AddressNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.service.stores.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final AddressMapper addressMapper;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam("address") Optional<String> address) {
        List<Address> addresses = addressService.getAll(address);
        List<AddressDto> addressesDto = addressMapper.toDto(addresses);
        return ResponseEntity.ok(addressesDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws AddressNotFoundException {
        Address address = addressService.getById(id);
        AddressDto addressDto = addressMapper.toDto(address);
        return ResponseEntity.ok(addressDto);
    }

    @PostMapping
    public ResponseEntity<?> add(@Valid @RequestBody AddressDto addressDto) {
        Address address = addressMapper.toEntity(addressDto);
        addressService.save(address);
        addressDto = addressMapper.toDto(address);
        return ResponseEntity.ok(addressDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws AddressNotFoundException {
        addressService.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
