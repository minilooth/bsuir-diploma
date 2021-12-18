package by.minilooth.diploma.controller.stores;

import by.minilooth.diploma.dto.stores.AddressDto;
import by.minilooth.diploma.dto.stores.ProcessAddressDto;
import by.minilooth.diploma.dto.stores.mapper.AddressMapper;
import by.minilooth.diploma.dto.stores.mapper.ProcessAddressMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.stores.AddressNotFoundException;
import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.stores.ProcessAddress;
import by.minilooth.diploma.service.stores.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/address")
@Validated
public class AddressController {

    @Autowired private AddressService addressService;
    @Autowired private AddressMapper addressMapper;
    @Autowired private ProcessAddressMapper processAddressMapper;

    @GetMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll() {
        List<Address> addresses = addressService.getAll();
        List<AddressDto> addressesDto = addressMapper.toDto(addresses);
        return ResponseEntity.ok(addressesDto);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@Valid @RequestBody ProcessAddressDto processAddressDto) {
        ProcessAddress processAddress = processAddressMapper.toEntity(processAddressDto);
        Address address = addressService.save(processAddress);
        AddressDto addressDto = addressMapper.toDto(address);
        return ResponseEntity.ok(addressDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @Valid @RequestBody ProcessAddressDto processAddressDto)
            throws AddressNotFoundException {
        ProcessAddress processAddress = processAddressMapper.toEntity(processAddressDto);
        Address address = addressService.update(processAddress, id);
        AddressDto addressDto = addressMapper.toDto(address);
        return ResponseEntity.ok(addressDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws AddressNotFoundException,
            ActionIsImpossibleException {
        Address address = addressService.delete(id);
        AddressDto addressDto = addressMapper.toDto(address);
        return ResponseEntity.ok(addressDto);
    }

}
