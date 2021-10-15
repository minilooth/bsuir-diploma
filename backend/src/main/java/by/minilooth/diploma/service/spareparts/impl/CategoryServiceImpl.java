package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.spareparts.CategoryNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Category;
import by.minilooth.diploma.repository.spareparts.CategoryRepository;
import by.minilooth.diploma.service.spareparts.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public void save(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void delete(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public Category getById(Long id) throws CategoryNotFoundException {
        return categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
