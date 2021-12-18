package by.minilooth.diploma.service.catalog;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.CategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.spareparts.catalog.ProcessCategory;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    void save(Category category);
    Category save(ProcessCategory processCategory);
    Category update(ProcessCategory processCategory, Long id) throws CategoryNotFoundException;
    void delete(Category category);
    Category delete(Long id) throws CategoryNotFoundException, ActionIsImpossibleException;
    Category getById(Long id) throws CategoryNotFoundException;
    List<Category> getAll();

}
