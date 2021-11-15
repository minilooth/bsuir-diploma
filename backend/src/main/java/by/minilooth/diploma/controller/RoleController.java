package by.minilooth.diploma.controller;

import by.minilooth.diploma.dto.RoleDto;
import by.minilooth.diploma.dto.mapper.RoleMapper;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.service.users.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/role")
@RestController
public class RoleController {

    @Autowired private RoleService roleService;
    @Autowired private RoleMapper roleMapper;

    @GetMapping("/all")
    @PreAuthorize("hasRole('" + Role.ADMIN +"')")
    public ResponseEntity<?> getAll() {
        List<Role> roles = roleService.getAll();
        List<RoleDto> roleDtos = roleMapper.toDto(roles);
        return ResponseEntity.ok(roleDtos);
    }

}
