package by.minilooth.diploma.controller.spareparts.catalog;

import by.minilooth.diploma.dto.spareparts.catalog.GroupDto;
import by.minilooth.diploma.dto.spareparts.catalog.ProcessGroupDto;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.GroupMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.ProcessGroupMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.categories.GroupNotFoundException;
import by.minilooth.diploma.exception.categories.SubcategoryNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.spareparts.catalog.ProcessGroup;
import by.minilooth.diploma.service.catalog.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/group")
@RestController
public class GroupController {

    @Autowired private GroupMapper groupMapper;
    @Autowired private GroupService groupService;
    @Autowired private ProcessGroupMapper processGroupMapper;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> getBySubcategory(@PathVariable("id") Long id) throws SubcategoryNotFoundException {
        List<Group> groups = groupService.getAllBySubcategory(id);
        List<GroupDto> groupDtos = groupMapper.toDto(groups);
        return ResponseEntity.ok(groupDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> add(@RequestBody ProcessGroupDto processGroupDto) {
        ProcessGroup processGroup = processGroupMapper.toEntity(processGroupDto);
        Group group = groupService.save(processGroup);
        GroupDto groupDto = groupMapper.toDto(group);
        return ResponseEntity.ok(groupDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessGroupDto processGroupDto)
            throws GroupNotFoundException {
        ProcessGroup processGroup = processGroupMapper.toEntity(processGroupDto);
        Group group = groupService.update(processGroup, id);
        GroupDto groupDto = groupMapper.toDto(group);
        return ResponseEntity.ok(groupDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws GroupNotFoundException,
            ActionIsImpossibleException {
        Group group = groupService.delete(id);
        GroupDto groupDto = groupMapper.toDto(group);
        return ResponseEntity.ok(groupDto);
    }

}
