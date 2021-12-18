package by.minilooth.diploma.controller.spareparts.vehicle;

import by.minilooth.diploma.dto.spareparts.vehicle.ModelDto;
import by.minilooth.diploma.dto.spareparts.vehicle.ProcessModelDto;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.ModelBeanMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.ProcessModelMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessModel;
import by.minilooth.diploma.service.vehicle.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/model")
@RestController
public class ModelController {

    @Autowired private ModelBeanMapper modelBeanMapper;
    @Autowired private ModelService modelService;
    @Autowired private ProcessModelMapper processModelMapper;

    @GetMapping("/all/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll(@PathVariable("id") Long id) throws MakeNotFoundException {
        List<Model> models = modelService.getAllByMakeSorted(id);
        List<ModelDto> modelDtos = modelBeanMapper.toDto(models);
        return ResponseEntity.ok(modelDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws ModelNotFoundException {
        Model model = modelService.getById(id);
        ModelDto modelDto = modelBeanMapper.toDto(model);
        return ResponseEntity.ok(modelDto);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessModelDto processModelDto) {
        ProcessModel processModel = processModelMapper.toEntity(processModelDto);
        Model model = modelService.save(processModel);
        ModelDto modelDto = modelBeanMapper.toDto(model);
        return ResponseEntity.ok(modelDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessModelDto processModelDto) throws
            ModelNotFoundException {
        ProcessModel processModel = processModelMapper.toEntity(processModelDto);
        Model model = modelService.update(processModel, id);
        ModelDto modelDto = modelBeanMapper.toDto(model);
        return ResponseEntity.ok(modelDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws ModelNotFoundException,
            ActionIsImpossibleException {
        Model model = modelService.delete(id);
        ModelDto modelDto = modelBeanMapper.toDto(model);
        return ResponseEntity.ok(modelDto);
    }

}
