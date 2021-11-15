package by.minilooth.diploma.models.bean.catalog.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;

public class GroupBuilder extends AbstractBuilder<Group> {

    public GroupBuilder() {
        entity = new Group();
    }

    public GroupBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public GroupBuilder name(String name) {
        entity.setName(name);
        return this;
    }

    public GroupBuilder subcategory(Subcategory subcategory) {
        entity.setSubcategory(subcategory);
        return this;
    }

}
