package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;

import java.util.List;

public interface SparePartService {

    void save(SparePart sparePart);
    void delete(SparePart sparePart);
    SparePart getById(Long id) throws SparePartNotFoundException;
    List<SparePart> getAll();
    Boolean existsByManufacturer(Manufacturer manufacturer);
    Boolean existsByMake(Make make);
    Boolean existsByModel(Model model);
    Boolean existsByGeneration(Generation generation);
    Boolean existsByCategory(Category category);
    Boolean existsBySubcategory(Subcategory subcategory);
    Boolean existsByGroup(Group group);
    Boolean existsByModification(Modification modification);

}
