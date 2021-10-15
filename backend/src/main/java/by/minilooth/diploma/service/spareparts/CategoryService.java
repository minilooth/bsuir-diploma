package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.spareparts.CategoryNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Category;

import java.util.List;

public interface CategoryService {

    void save(Category category);
    void delete(Category category);
    Category getById(Long id) throws CategoryNotFoundException;
    List<Category> getAll();

}
