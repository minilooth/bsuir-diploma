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
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.QueryHint;
import java.util.List;
import java.util.Optional;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "SparePart.findAll")
    List<SparePart> findAll();

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "SparePart.findById")
    Optional<SparePart> findById(Long id);

    Boolean existsByManufacturer(Manufacturer manufacturer);
    Boolean existsByMake(Make make);
    Boolean existsByModel(Model model);
    Boolean existsByGeneration(Generation generation);
    Boolean existsByCategory(Category category);
    Boolean existsBySubcategory(Subcategory subcategory);
    Boolean existsByGroup(Group group);
    Boolean existsByCharacteristicsModification(Modification modification);
    Boolean existsByArticle(String article);

}
