package by.minilooth.diploma.controller;

import by.minilooth.diploma.dto.ManufacturerDto;
import by.minilooth.diploma.dto.mapper.ManufacturerMapper;
import by.minilooth.diploma.exception.spareparts.ManufacturerNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.service.spareparts.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manufacturer")
@RequiredArgsConstructor
public class ManufacturerController {

    private final ManufacturerService manufacturerService;
    private final ManufacturerMapper manufacturerMapper;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam("name") Optional<String> name) {
        List<Manufacturer> manufacturers = manufacturerService.getAll(name);
        List<ManufacturerDto> brandsDto = manufacturerMapper.toDto(manufacturers);
        return ResponseEntity.ok(brandsDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws ManufacturerNotFoundException {
        Manufacturer manufacturer = manufacturerService.getById(id);
        ManufacturerDto manufacturerDto = manufacturerMapper.toDto(manufacturer);
        return ResponseEntity.ok(manufacturerDto);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody ManufacturerDto manufacturerDto) {
        Manufacturer manufacturer = manufacturerMapper.toEntity(manufacturerDto);
        manufacturerService.save(manufacturer);
        manufacturerDto = manufacturerMapper.toDto(manufacturer);
        return ResponseEntity.ok(manufacturerDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws ManufacturerNotFoundException {
        manufacturerService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
