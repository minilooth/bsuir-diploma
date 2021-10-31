package by.minilooth.diploma.repository.catalog;

import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    List<Group> findAllBySubcategory(Subcategory subcategory);
    Boolean existsBySubcategory(Subcategory subcategory);

}
