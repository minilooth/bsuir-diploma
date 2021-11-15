package by.minilooth.diploma.models.spareparts;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.spareparts.Characteristic;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import lombok.Data;

import java.util.List;

@Data
public class ProcessSparePart implements BaseEntity {

    private String name;
    private Manufacturer manufacturer;
    private String article;
    private String description;
    private Float purchasePrice;
    private Float retailPrice;
    private List<Characteristic> characteristics;
    private Make make;
    private Model model;
    private Generation generation;
    private Category category;
    private Subcategory subcategory;
    private Group group;

}
