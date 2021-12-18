package by.minilooth.diploma.service.catalog;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.CategoryNotFoundException;
import by.minilooth.diploma.exception.categories.SubcategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.spareparts.catalog.ProcessSubcategory;

import java.util.List;
import java.util.Optional;

public interface SubcategoryService {

    void save(Subcategory subcategory);
    Subcategory save(ProcessSubcategory processSubcategory);
    Subcategory update(ProcessSubcategory processSubcategory, Long id) throws SubcategoryNotFoundException;
    void delete(Subcategory subcategory);
    Subcategory delete(Long id) throws SubcategoryNotFoundException, ActionIsImpossibleException;
    Subcategory getById(Long id) throws SubcategoryNotFoundException;
    List<Subcategory> getAll();
    List<Subcategory> getAllByCategory(Long id) throws CategoryNotFoundException;
    Boolean existsByCategory(Category category);

}
