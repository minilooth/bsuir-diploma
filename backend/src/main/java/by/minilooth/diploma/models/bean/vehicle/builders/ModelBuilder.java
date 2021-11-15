package by.minilooth.diploma.models.bean.vehicle.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;

import java.util.HashSet;
import java.util.Set;

public class ModelBuilder extends AbstractBuilder<Model> {

    public ModelBuilder() {
        entity = new Model();
        entity.setGenerations(new HashSet<>());
    }

    public ModelBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public ModelBuilder name(String name) {
        entity.setName(name);
        return this;
    }

    public ModelBuilder make(Make make) {
        entity.setMake(make);
        return this;
    }

    public ModelBuilder generations(Set<Generation> generations) {
        entity.setGenerations(generations);
        return this;
    }

}
