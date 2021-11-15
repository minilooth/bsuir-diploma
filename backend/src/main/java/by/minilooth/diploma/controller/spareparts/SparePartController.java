package by.minilooth.diploma.controller.spareparts;

import by.minilooth.diploma.dto.spareparts.*;
import by.minilooth.diploma.dto.spareparts.mapper.*;
import by.minilooth.diploma.exception.spareparts.SparePartAlreadyExistsException;
import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.spareparts.ProcessSparePart;
import by.minilooth.diploma.models.spareparts.SparePartFilter;
import by.minilooth.diploma.models.spareparts.SparePartList;
import by.minilooth.diploma.service.spareparts.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/spare-part")
@RestController
public class SparePartController {

    @Autowired private SparePartService sparePartService;
    @Autowired private SparePartMapper sparePartMapper;
    @Autowired private ProcessSparePartMapper processSparePartMapper;
    @Autowired private SparePartFilterMapper sparePartFilterMapper;
    @Autowired private SparePartListMapper sparePartListMapper;
    @Autowired private AvailabilityMapper availabilityMapper;

    @PostMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll(@RequestBody SparePartFilterDto sparePartFilterDto) {
        SparePartFilter sparePartFilter = sparePartFilterMapper.toEntity(sparePartFilterDto);
        SparePartList sparePartList = sparePartService.getAll(sparePartFilter);
        SparePartListDto sparePartListDto = sparePartListMapper.toDto(sparePartList);
        return ResponseEntity.ok(sparePartListDto);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<SparePart> sparePartList = sparePartService.getAll();
        List<SparePartDto> sparePartDtos = sparePartMapper.toDto(sparePartList);
        return ResponseEntity.ok(sparePartDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessSparePartDto processSparePartDto)
            throws SparePartAlreadyExistsException {
        ProcessSparePart processSparePart = processSparePartMapper.toEntity(processSparePartDto);
        SparePart sparePart = sparePartService.save(processSparePart);
        SparePartDto sparePartDto = sparePartMapper.toDto(sparePart);
        return ResponseEntity.ok(sparePartDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@RequestBody ProcessSparePartDto processSparePartDto, @PathVariable("id") Long id)
            throws SparePartAlreadyExistsException, SparePartNotFoundException {
        ProcessSparePart processSparePart = processSparePartMapper.toEntity(processSparePartDto);
        SparePart sparePart = sparePartService.update(processSparePart, id);
        SparePartDto sparePartDto = sparePartMapper.toDto(sparePart);
        return ResponseEntity.ok(sparePartDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws SparePartNotFoundException {
        SparePart sparePart = sparePartService.delete(id);
        SparePartDto sparePartDto = sparePartMapper.toDto(sparePart);
        return ResponseEntity.ok(sparePartDto);
    }

    @PostMapping("/availability/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> updateAvailability(@RequestBody List<AvailabilityDto> availabilityDtos,
                                                @PathVariable("id") Long id) throws SparePartNotFoundException {
        List<Availability> availabilities = availabilityMapper.toEntity(availabilityDtos);
        SparePart sparePart = sparePartService.updateAvailability(availabilities, id);
        SparePartDto sparePartDto = sparePartMapper.toDto(sparePart);
        return ResponseEntity.ok(sparePartDto);
    }

}
