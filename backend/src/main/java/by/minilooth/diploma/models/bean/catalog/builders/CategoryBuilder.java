package by.minilooth.diploma.models.bean.catalog.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Subcategory;

import java.util.HashSet;
import java.util.Set;

public class CategoryBuilder extends AbstractBuilder<Category> {

    public CategoryBuilder() {
        entity = new Category();
        entity.setSubcategories(new HashSet<>());
    }

    public CategoryBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public CategoryBuilder name(String name) {
        entity.setName(name);
        return this;
    }

    public CategoryBuilder subcategories(Set<Subcategory> subcategories) {
        entity.setSubcategories(subcategories);
        return this;
    }

}
