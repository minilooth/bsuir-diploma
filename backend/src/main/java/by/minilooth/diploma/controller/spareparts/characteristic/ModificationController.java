package by.minilooth.diploma.controller.spareparts.characteristic;

import by.minilooth.diploma.dto.spareparts.characteristics.ModificationDto;
import by.minilooth.diploma.dto.spareparts.characteristics.ProcessModificationDto;
import by.minilooth.diploma.dto.spareparts.characteristics.mapper.ModificationMapper;
import by.minilooth.diploma.dto.spareparts.characteristics.mapper.ProcessModificationMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.spareparts.ModificationNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.spareparts.characteristic.ProcessModification;
import by.minilooth.diploma.service.spareparts.ModificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/modification")
@RestController
public class ModificationController {

    @Autowired private ModificationService modificationService;
    @Autowired private ModificationMapper modificationMapper;
    @Autowired private ProcessModificationMapper processModificationMapper;

    @GetMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll() {
        List<Modification> modifications = modificationService.getAll();
        List<ModificationDto> modificationDtos = modificationMapper.toDto(modifications);
        return ResponseEntity.ok(modificationDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessModificationDto processModificationDto) {
        ProcessModification processModification = processModificationMapper.toEntity(processModificationDto);
        Modification modification = modificationService.save(processModification);
        ModificationDto modificationDto = modificationMapper.toDto(modification);
        return ResponseEntity.ok(modificationDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessModificationDto processModificationDto)
            throws ModificationNotFoundException {
        ProcessModification processModification = processModificationMapper.toEntity(processModificationDto);
        Modification modification = modificationService.update(processModification, id);
        ModificationDto modificationDto = modificationMapper.toDto(modification);
        return ResponseEntity.ok(modificationDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws ModificationNotFoundException,
            ActionIsImpossibleException {
        Modification modification = modificationService.delete(id);
        ModificationDto modificationDto = modificationMapper.toDto(modification);
        return ResponseEntity.ok(modificationDto);
    }

}
