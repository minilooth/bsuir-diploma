package by.minilooth.diploma.service.catalog.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.CategoryNotFoundException;
import by.minilooth.diploma.exception.categories.SubcategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.spareparts.catalog.ProcessSubcategory;
import by.minilooth.diploma.repository.catalog.SubcategoryRepository;
import by.minilooth.diploma.service.catalog.CategoryService;
import by.minilooth.diploma.service.catalog.GroupService;
import by.minilooth.diploma.service.catalog.SubcategoryService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubcategoryServiceImpl implements SubcategoryService {

    @Autowired private SubcategoryRepository subcategoryRepository;
    @Autowired private CategoryService categoryService;
    @Autowired private GroupService groupService;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Subcategory subcategory) {
        subcategoryRepository.save(subcategory);
    }

    @Override
    public Subcategory save(ProcessSubcategory processSubcategory) {
        Subcategory subcategory = Subcategory.builder()
                .category(processSubcategory.getCategory())
                .name(processSubcategory.getName().trim())
                .build();
        save(subcategory);
        return subcategory;
    }

    @Override
    public Subcategory update(ProcessSubcategory processSubcategory, Long id) throws SubcategoryNotFoundException {
        Subcategory subcategory = getById(id);

        subcategory.setCategory(processSubcategory.getCategory());
        subcategory.setName(processSubcategory.getName().trim());

        save(subcategory);
        return subcategory;
    }

    @Override
    public void delete(Subcategory subcategory) {
        subcategoryRepository.delete(subcategory);
    }

    @Override
    public Subcategory delete(Long id) throws SubcategoryNotFoundException, ActionIsImpossibleException {
        Subcategory subcategory = getById(id);

        if (groupService.existsBySubcategory(subcategory)) {
            throw new ActionIsImpossibleException("Невозможно удалить подкатегорию в которой существуют группы");
        }

        if (sparePartService.existsBySubcategory(subcategory)) {
            throw new ActionIsImpossibleException("Невозможно удалить подкатегорию которая используется в запчасти");
        }

        delete(subcategory);
        return subcategory;
    }

    @Override
    public Subcategory getById(Long id) throws SubcategoryNotFoundException {
        return subcategoryRepository.findById(id).orElseThrow(() -> new SubcategoryNotFoundException(id));
    }

    @Override
    public List<Subcategory> getAll() {
        return subcategoryRepository.findAll();
    }

    @Override
    public List<Subcategory> getAllByCategory(Long id) throws CategoryNotFoundException {
        Category category = categoryService.getById(id);
        return subcategoryRepository.findAllByCategory(category);
    }

    @Override
    public Boolean existsByCategory(Category category) {
        return subcategoryRepository.existsByCategory(category);
    }

}
