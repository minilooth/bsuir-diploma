package by.minilooth.diploma.controller.spareparts.vehicle;

import by.minilooth.diploma.dto.spareparts.vehicle.GenerationDto;
import by.minilooth.diploma.dto.spareparts.vehicle.ProcessGenerationDto;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.GenerationMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.ProcessGenerationMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.GenerationNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessGeneration;
import by.minilooth.diploma.service.vehicle.GenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/generation")
@RestController
public class GenerationController {

    @Autowired private GenerationService generationService;
    @Autowired private GenerationMapper generationMapper;
    @Autowired private ProcessGenerationMapper processGenerationMapper;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getByModel(@PathVariable("id") Long id) throws ModelNotFoundException {
        List<Generation> generations = generationService.getAllByModelSorted(id);
        List<GenerationDto> generationDtos = generationMapper.toDto(generations);
        return ResponseEntity.ok(generationDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessGenerationDto processGenerationDto) {
        ProcessGeneration processGeneration = processGenerationMapper.toEntity(processGenerationDto);
        Generation generation = generationService.save(processGeneration);
        GenerationDto generationDto = generationMapper.toDto(generation);
        return ResponseEntity.ok(generationDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessGenerationDto processGenerationDto)
        throws GenerationNotFoundException {
        ProcessGeneration processGeneration = processGenerationMapper.toEntity(processGenerationDto);
        Generation generation = generationService.update(processGeneration, id);
        GenerationDto generationDto = generationMapper.toDto(generation);
        return ResponseEntity.ok(generationDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws GenerationNotFoundException,
            ActionIsImpossibleException {
        Generation generation = generationService.delete(id);
        GenerationDto generationDto = generationMapper.toDto(generation);
        return ResponseEntity.ok(generationDto);
    }


}
