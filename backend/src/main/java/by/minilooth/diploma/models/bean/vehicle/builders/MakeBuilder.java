package by.minilooth.diploma.models.bean.vehicle.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;

import java.util.HashSet;
import java.util.Set;

public class MakeBuilder extends AbstractBuilder<Make> {

    public MakeBuilder() {
        entity = new Make();
        entity.setModels(new HashSet<>());
    }

    public MakeBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public MakeBuilder name(String name) {
        entity.setName(name);
        return this;
    }

    public MakeBuilder models(Set<Model> models) {
        entity.setModels(models);
        return this;
    }

}
