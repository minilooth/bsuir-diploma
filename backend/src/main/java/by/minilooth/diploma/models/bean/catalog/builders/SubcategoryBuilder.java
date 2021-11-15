package by.minilooth.diploma.models.bean.catalog.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;

import java.util.HashSet;
import java.util.Set;

public class SubcategoryBuilder extends AbstractBuilder<Subcategory> {

    public SubcategoryBuilder() {
        entity = new Subcategory();
        entity.setGroups(new HashSet<>());
    }

    public SubcategoryBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public SubcategoryBuilder name(String name) {
        entity.setName(name);
        return this;
    }

    public SubcategoryBuilder category(Category category) {
        entity.setCategory(category);
        return this;
    }

    public SubcategoryBuilder groups(Set<Group> groups) {
        entity.setGroups(groups);
        return this;
    }

}
