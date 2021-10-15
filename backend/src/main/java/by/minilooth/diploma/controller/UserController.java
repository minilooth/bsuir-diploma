package by.minilooth.diploma.controller;

import by.minilooth.diploma.dto.UserDto;
import by.minilooth.diploma.dto.mapper.UserMapper;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> get() {
        List<User> users = userService.getAll();
        List<UserDto> userDtos = userMapper.toDto(users);
        return ResponseEntity.ok(userDtos);
    }

}
