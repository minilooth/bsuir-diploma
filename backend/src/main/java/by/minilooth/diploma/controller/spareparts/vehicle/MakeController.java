package by.minilooth.diploma.controller.spareparts.vehicle;

import by.minilooth.diploma.dto.spareparts.vehicle.MakeDto;
import by.minilooth.diploma.dto.spareparts.vehicle.ProcessMakeDto;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.MakeMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.ProcessMakeMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessMake;
import by.minilooth.diploma.service.vehicle.MakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/make")
@RestController
public class MakeController {

    @Autowired private MakeMapper makeMapper;
    @Autowired private MakeService makeService;
    @Autowired private ProcessMakeMapper processMakeMapper;

    @GetMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> get() {
        List<Make> makes = makeService.getAllSorted();
        List<MakeDto> makeDtos = makeMapper.toDto(makes);
        return ResponseEntity.ok(makeDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessMakeDto processMakeDto) {
        ProcessMake processMake = processMakeMapper.toEntity(processMakeDto);
        Make make = makeService.save(processMake);
        MakeDto makeDto = makeMapper.toDto(make);
        return ResponseEntity.ok(makeDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessMakeDto processMakeDto)
            throws MakeNotFoundException {
        ProcessMake processMake = processMakeMapper.toEntity(processMakeDto);
        Make make = makeService.update(processMake, id);
        MakeDto makeDto = makeMapper.toDto(make);
        return ResponseEntity.ok(makeDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws MakeNotFoundException,
            ActionIsImpossibleException {
        Make make = makeService.delete(id);
        MakeDto makeDto = makeMapper.toDto(make);
        return ResponseEntity.ok(makeDto);
    }

}
