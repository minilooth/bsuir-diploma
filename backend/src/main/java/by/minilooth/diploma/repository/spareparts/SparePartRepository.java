package by.minilooth.diploma.repository.spareparts;

import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.spareparts.Characteristic;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart, Long> {

    Boolean existsByManufacturer(Manufacturer manufacturer);
    Boolean existsByMake(Make make);
    Boolean existsByModel(Model model);
    Boolean existsByGeneration(Generation generation);
    Boolean existsByCategory(Category category);
    Boolean existsBySubcategory(Subcategory subcategory);
    Boolean existsByGroup(Group group);
    Boolean existsByCharacteristicsModification(Modification modification);

}
