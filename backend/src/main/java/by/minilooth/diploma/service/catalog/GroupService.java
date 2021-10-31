package by.minilooth.diploma.service.catalog;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.GroupNotFoundException;
import by.minilooth.diploma.exception.categories.SubcategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.spareparts.catalog.ProcessGroup;

import java.util.List;
import java.util.Optional;

public interface GroupService {

    void save(Group group);
    Group save(ProcessGroup processGroup);
    Group update(ProcessGroup processGroup, Long id) throws GroupNotFoundException;
    void delete(Group group);
    Group delete(Long id) throws GroupNotFoundException, ActionIsImpossibleException;
    Optional<Group> getById(Long id);
    List<Group> getAll();
    List<Group> getAllBySubcategory(Long id) throws SubcategoryNotFoundException;
    Boolean existsBySubcategory(Subcategory subcategory);

}
