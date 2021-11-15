package by.minilooth.diploma.models.bean.common.builders;

import by.minilooth.diploma.common.api.builder.AbstractBuilder;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.users.User;

public class ImageBuilder extends AbstractBuilder<Image> {

    public ImageBuilder() {
        entity = new Image();
    }

    public ImageBuilder id(Long id) {
        entity.setId(id);
        return this;
    }

    public ImageBuilder filename(String filename) {
        entity.setFilename(filename);
        return this;
    }

    public ImageBuilder user(User user) {
        entity.setUser(user);
        return this;
    }

    public ImageBuilder store(Store store) {
        entity.setStore(store);
        return this;
    }

    public ImageBuilder sparePart(SparePart sparePart) {
        entity.setSparePart(sparePart);
        return this;
    }

}
