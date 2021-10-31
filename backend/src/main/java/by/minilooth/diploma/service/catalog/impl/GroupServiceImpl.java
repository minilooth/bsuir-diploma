package by.minilooth.diploma.service.catalog.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.GroupNotFoundException;
import by.minilooth.diploma.exception.categories.SubcategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.spareparts.catalog.ProcessGroup;
import by.minilooth.diploma.repository.catalog.GroupRepository;
import by.minilooth.diploma.service.catalog.GroupService;
import by.minilooth.diploma.service.catalog.SubcategoryService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired private GroupRepository groupRepository;
    @Autowired private SubcategoryService subcategoryService;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Group group) {
        groupRepository.save(group);
    }

    @Override
    public Group save(ProcessGroup processGroup) {
        Group group = Group.builder()
                .subcategory(processGroup.getSubcategory())
                .name(processGroup.getName().trim())
                .build();
        save(group);
        return group;
    }

    @Override
    public Group update(ProcessGroup processGroup, Long id) throws GroupNotFoundException {
        Group group = getById(id).orElseThrow(() -> new GroupNotFoundException(id));

        group.setSubcategory(processGroup.getSubcategory());
        group.setName(processGroup.getName().trim());

        save(group);
        return group;
    }

    @Override
    public void delete(Group group) {
        groupRepository.delete(group);
    }

    @Override
    public Group delete(Long id) throws GroupNotFoundException, ActionIsImpossibleException {
        Group group = getById(id).orElseThrow(() -> new GroupNotFoundException(id));

        if (sparePartService.existsByGroup(group)) {
            throw new ActionIsImpossibleException("Невозможно удалить группу которая используется в запчасти");
        }

        delete(group);
        return group;
    }

    @Override
    public Optional<Group> getById(Long id) {
        return groupRepository.findById(id);
    }

    @Override
    public List<Group> getAll() {
        return groupRepository.findAll();
    }

    @Override
    public List<Group> getAllBySubcategory(Long id) throws SubcategoryNotFoundException {
        Subcategory subcategory = subcategoryService.getById(id).orElseThrow(() -> new SubcategoryNotFoundException(id));
        return groupRepository.findAllBySubcategory(subcategory);
    }

    @Override
    public Boolean existsBySubcategory(Subcategory subcategory) {
        return groupRepository.existsBySubcategory(subcategory);
    }
}
