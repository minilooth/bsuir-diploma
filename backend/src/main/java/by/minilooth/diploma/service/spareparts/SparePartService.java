package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.spareparts.SparePartAlreadyExistsException;
import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.ProcessSparePart;
import by.minilooth.diploma.models.spareparts.SparePartFilter;
import by.minilooth.diploma.models.spareparts.SparePartList;

import java.util.List;
import java.util.Optional;

public interface SparePartService {

    Long ITEMS_PER_PAGE = 15L;

    void save(SparePart sparePart);
    void delete(SparePart sparePart);
    SparePart save(ProcessSparePart processSparePart) throws SparePartAlreadyExistsException;
    SparePart update(ProcessSparePart processSparePart, Long id) throws SparePartNotFoundException,
            SparePartAlreadyExistsException;
    SparePart delete(Long id) throws SparePartNotFoundException;
    SparePart updateAvailability(List<Availability> availabilities, Long id) throws SparePartNotFoundException;
    Optional<SparePart> getById(Long id);
    List<SparePart> getAll();
    SparePartList getAll(SparePartFilter sparePartFilter);
    Boolean existsByManufacturer(Manufacturer manufacturer);
    Boolean existsByMake(Make make);
    Boolean existsByModel(Model model);
    Boolean existsByGeneration(Generation generation);
    Boolean existsByCategory(Category category);
    Boolean existsBySubcategory(Subcategory subcategory);
    Boolean existsByGroup(Group group);
    Boolean existsByModification(Modification modification);
    Boolean existsByArticle(String article);

}
