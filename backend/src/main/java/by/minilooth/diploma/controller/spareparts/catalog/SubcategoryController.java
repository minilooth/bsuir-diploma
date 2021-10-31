package by.minilooth.diploma.controller.spareparts.catalog;

import by.minilooth.diploma.dto.spareparts.catalog.ProcessSubcategoryDto;
import by.minilooth.diploma.dto.spareparts.catalog.SubcategoryDto;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.ProcessSubcategoryMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.SubcategoryMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.CategoryNotFoundException;
import by.minilooth.diploma.exception.categories.SubcategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.spareparts.catalog.ProcessSubcategory;
import by.minilooth.diploma.service.catalog.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/subcategory")
@RestController
public class SubcategoryController {

    @Autowired private SubcategoryService subcategoryService;
    @Autowired private SubcategoryMapper subcategoryMapper;
    @Autowired private ProcessSubcategoryMapper processSubcategoryMapper;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getByCategory(@PathVariable("id") Long id) throws CategoryNotFoundException {
        List<Subcategory> subcategories = subcategoryService.getAllByCategory(id);
        List<SubcategoryDto> subcategoryDtos = subcategoryMapper.toDto(subcategories);
        return ResponseEntity.ok(subcategoryDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessSubcategoryDto processSubcategoryDto) {
        ProcessSubcategory processSubcategory = processSubcategoryMapper.toEntity(processSubcategoryDto);
        Subcategory subcategory = subcategoryService.save(processSubcategory);
        SubcategoryDto subcategoryDto = subcategoryMapper.toDto(subcategory);
        return ResponseEntity.ok(subcategoryDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessSubcategoryDto processSubcategoryDto)
            throws SubcategoryNotFoundException {
        ProcessSubcategory processSubcategory = processSubcategoryMapper.toEntity(processSubcategoryDto);
        Subcategory subcategory = subcategoryService.update(processSubcategory, id);
        SubcategoryDto subcategoryDto = subcategoryMapper.toDto(subcategory);
        return ResponseEntity.ok(subcategoryDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws SubcategoryNotFoundException,
            ActionIsImpossibleException {
        Subcategory subcategory = subcategoryService.delete(id);
        SubcategoryDto subcategoryDto = subcategoryMapper.toDto(subcategory);
        return ResponseEntity.ok(subcategoryDto);
    }

}
