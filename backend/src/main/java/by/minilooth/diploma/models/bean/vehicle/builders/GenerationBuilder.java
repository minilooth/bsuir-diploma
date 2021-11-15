package by.minilooth.diploma.models.bean.vehicle.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Model;

public class GenerationBuilder extends AbstractBuilder<Generation> {

    public GenerationBuilder() {
        entity = new Generation();
    }

    public GenerationBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public GenerationBuilder name(String name) {
        entity.setName(name);
        return this;
    }

    public GenerationBuilder model(Model model) {
        entity.setModel(model);
        return this;
    }

}
