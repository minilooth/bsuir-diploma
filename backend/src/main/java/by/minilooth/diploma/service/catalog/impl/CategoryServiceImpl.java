package by.minilooth.diploma.service.catalog.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.CategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.spareparts.catalog.ProcessCategory;
import by.minilooth.diploma.repository.catalog.CategoryRepository;
import by.minilooth.diploma.service.catalog.CategoryService;
import by.minilooth.diploma.service.catalog.SubcategoryService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired private CategoryRepository categoryRepository;
    @Autowired private SubcategoryService subcategoryService;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public Category save(ProcessCategory processCategory) {
        Category category = Category.builder()
                .name(processCategory.getName().trim())
                .build();
        save(category);
        return category;
    }

    @Override
    public Category update(ProcessCategory processCategory, Long id) throws CategoryNotFoundException {
        Category category = getById(id).orElseThrow(() -> new CategoryNotFoundException(id));

        category.setName(processCategory.getName().trim());

        save(category);
        return category;
    }

    @Override
    public void delete(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public Category delete(Long id) throws CategoryNotFoundException, ActionIsImpossibleException {
        Category category = getById(id).orElseThrow(() -> new CategoryNotFoundException(id));

        if (subcategoryService.existsByCategory(category)) {
            throw new ActionIsImpossibleException("Невозможно удалить категорию в которой существуют подкатегории");
        }

        if (sparePartService.existsByCategory(category)) {
            throw new ActionIsImpossibleException("Невозможно удалить категорию которая используется в запчасти");
        }

        delete(category);
        return category;
    }

    @Override
    public Optional<Category> getById(Long id){
        return categoryRepository.findById(id);
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
