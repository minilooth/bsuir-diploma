package by.minilooth.diploma.controller;

import by.minilooth.diploma.dto.ChangePasswordDto;
import by.minilooth.diploma.dto.ProcessUserDto;
import by.minilooth.diploma.dto.UserDto;
import by.minilooth.diploma.dto.UserFilterDto;
import by.minilooth.diploma.dto.mapper.ChangePasswordMapper;
import by.minilooth.diploma.dto.mapper.ProcessUserMapper;
import by.minilooth.diploma.dto.mapper.UserFilterMapper;
import by.minilooth.diploma.dto.mapper.UserMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.PasswordsAreDifferentException;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.ChangePassword;
import by.minilooth.diploma.models.ProcessUser;
import by.minilooth.diploma.models.UserFilter;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;
    private final UserFilterMapper userFilterMapper;
    private final ProcessUserMapper processUserMapper;
    private final ChangePasswordMapper changePasswordMapper;

    @PostMapping("/all")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> getAll(@RequestBody UserFilterDto userFilterDto) {
        UserFilter userFilter = userFilterMapper.toEntity(userFilterDto);
        List<User> users = userService.getAll(userFilter);
        List<UserDto> userDtos = userMapper.toDto(users);
        return ResponseEntity.ok(userDtos);
    }

    @PutMapping
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> save(@RequestBody ProcessUserDto processUserDto) throws UserAlreadyExistsException {
        ProcessUser processUser = processUserMapper.toEntity(processUserDto);
        User user = userService.save(processUser);
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody ProcessUserDto processUserDto)
            throws UserAlreadyExistsException, UserNotFoundException {
        ProcessUser processUser = processUserMapper.toEntity(processUserDto);
        User user = userService.update(processUser, id);
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws UserNotFoundException, ActionIsImpossibleException {
        User user = userService.delete(id);
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/lock/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN + "')")
    public ResponseEntity<?> lock(@PathVariable("id") Long id) throws UserNotFoundException, ActionIsImpossibleException {
        User user = userService.lock(id);
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/password/{id}")
    @PreAuthorize("hasRole('" + Role.ADMIN +"')")
    public ResponseEntity<?> changePassword(@PathVariable("id") Long id, @RequestBody ChangePasswordDto changePasswordDto)
            throws UserNotFoundException, PasswordsAreDifferentException {
        ChangePassword changePassword = changePasswordMapper.toEntity(changePasswordDto);
        User user = userService.changePassword(id, changePassword);
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

}
