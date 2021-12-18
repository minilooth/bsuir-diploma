package by.minilooth.diploma.controller.spareparts.manufacturer;

import by.minilooth.diploma.dto.spareparts.manufacturer.ManufacturerDto;
import by.minilooth.diploma.dto.spareparts.manufacturer.ProcessManufacturerDto;
import by.minilooth.diploma.dto.spareparts.manufacturer.mapper.ManufacturerMapper;
import by.minilooth.diploma.dto.spareparts.manufacturer.mapper.ProcessManufacturerMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.spareparts.ManufacturerNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.spareparts.manufacturer.ProcessManufacturer;
import by.minilooth.diploma.service.spareparts.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manufacturer")
public class ManufacturerController {

    @Autowired private ManufacturerService manufacturerService;
    @Autowired private ManufacturerMapper manufacturerMapper;
    @Autowired private ProcessManufacturerMapper processManufacturerMapper;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll(@RequestParam("name") Optional<String> name) {
        List<Manufacturer> manufacturers = manufacturerService.getAll(name);
        List<ManufacturerDto> manufacturerDtos = manufacturerMapper.toDto(manufacturers);
        return ResponseEntity.ok(manufacturerDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws ManufacturerNotFoundException {
        Manufacturer manufacturer = manufacturerService.getById(id);
        ManufacturerDto manufacturerDto = manufacturerMapper.toDto(manufacturer);
        return ResponseEntity.ok(manufacturerDto);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessManufacturerDto processManufacturerDto) {
        ProcessManufacturer processManufacturer = processManufacturerMapper.toEntity(processManufacturerDto);
        Manufacturer manufacturer = manufacturerService.save(processManufacturer);
        ManufacturerDto manufacturerDto = manufacturerMapper.toDto(manufacturer);
        return ResponseEntity.ok(manufacturerDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessManufacturerDto processManufacturerDto)
            throws ManufacturerNotFoundException {
        ProcessManufacturer processManufacturer = processManufacturerMapper.toEntity(processManufacturerDto);
        Manufacturer manufacturer = manufacturerService.update(processManufacturer, id);
        ManufacturerDto manufacturerDto = manufacturerMapper.toDto(manufacturer);
        return ResponseEntity.ok(manufacturerDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws ManufacturerNotFoundException,
            ActionIsImpossibleException {
        Manufacturer manufacturer = manufacturerService.delete(id);
        ManufacturerDto manufacturerDto = manufacturerMapper.toDto(manufacturer);
        return ResponseEntity.ok(manufacturerDto);
    }

}
