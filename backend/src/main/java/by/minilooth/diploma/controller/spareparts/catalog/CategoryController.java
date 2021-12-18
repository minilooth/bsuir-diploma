package by.minilooth.diploma.controller.spareparts.catalog;

import by.minilooth.diploma.dto.spareparts.catalog.CategoryDto;
import by.minilooth.diploma.dto.spareparts.catalog.ProcessCategoryDto;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.CategoryMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.ProcessCategoryMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.CategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.spareparts.catalog.ProcessCategory;
import by.minilooth.diploma.service.catalog.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/category")
@RestController
public class CategoryController {

    @Autowired private CategoryService categoryService;
    @Autowired private CategoryMapper categoryMapper;
    @Autowired private ProcessCategoryMapper processCategoryMapper;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getAll() {
        List<Category> categories = categoryService.getAll();
        List<CategoryDto> categoryDtos = categoryMapper.toDto(categories);
        return ResponseEntity.ok(categoryDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) throws CategoryNotFoundException {
        Category category = categoryService.getById(id);
        CategoryDto categoryDto = categoryMapper.toDto(category);
        return ResponseEntity.ok(categoryDto);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessCategoryDto processCategoryDto) {
        ProcessCategory processCategory = processCategoryMapper.toEntity(processCategoryDto);
        Category category = categoryService.save(processCategory);
        CategoryDto categoryDto = categoryMapper.toDto(category);
        return ResponseEntity.ok(categoryDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessCategoryDto processCategoryDto)
            throws CategoryNotFoundException {
        ProcessCategory processCategory = processCategoryMapper.toEntity(processCategoryDto);
        Category category = categoryService.update(processCategory, id);
        CategoryDto categoryDto = categoryMapper.toDto(category);
        return ResponseEntity.ok(categoryDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws CategoryNotFoundException,
            ActionIsImpossibleException {
        Category category = categoryService.delete(id);
        CategoryDto categoryDto = categoryMapper.toDto(category);
        return ResponseEntity.ok(categoryDto);
    }

}
