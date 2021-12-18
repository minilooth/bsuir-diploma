package by.minilooth.diploma.controller;

import by.minilooth.diploma.dto.mapper.LoginParamsMapper;
import by.minilooth.diploma.dto.mapper.RegisterParamsMapper;
import by.minilooth.diploma.dto.mapper.RestorePasswordParamsMapper;
import by.minilooth.diploma.exception.users.AuthorityNotFoundException;
import by.minilooth.diploma.models.LoginParams;
import by.minilooth.diploma.models.RegisterParams;
import by.minilooth.diploma.dto.LoginParamsDto;
import by.minilooth.diploma.dto.RegisterParamsDto;
import by.minilooth.diploma.dto.RestorePasswordParamsDto;
import by.minilooth.diploma.dto.UserDto;
import by.minilooth.diploma.dto.mapper.UserMapper;
import by.minilooth.diploma.exception.users.UserAlreadyExistsException;
import by.minilooth.diploma.exception.users.UserNotFoundException;
import by.minilooth.diploma.models.RestorePasswordParams;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.service.users.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RequestMapping("/api/auth")
@RestController
@Validated
public class AuthController {

    @Autowired private AuthService authService;
    @Autowired private UserMapper userMapper;
    @Autowired private LoginParamsMapper loginParamsMapper;
    @Autowired private RegisterParamsMapper registerParamsMapper;
    @Autowired private RestorePasswordParamsMapper restorePasswordParamsMapper;

    @GetMapping("/is-logged-in")
    public ResponseEntity<?> isLoggedIn() {
        Boolean isAuthenticated = authService.isLoggedIn();
        return ResponseEntity.ok(isAuthenticated);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        User user = authService.getPrincipal();
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginParamsDto loginParamsDto, HttpServletResponse res) {
        LoginParams loginParams = loginParamsMapper.toEntity(loginParamsDto);
        User user = authService.authorize(loginParams, res);
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated(UserDto.Register.class) UserDto userDto)
            throws UserAlreadyExistsException, AuthorityNotFoundException {
        User user = userMapper.toEntity(userDto);
        User registeredUser = authService.register(user);
        UserDto registeredUserDto = userMapper.toDto(registeredUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUserDto);
    }

    @PostMapping("/restore-password")
    public ResponseEntity<?> restorePassword(@RequestBody @Valid RestorePasswordParamsDto restorePasswordParamsDto) throws UserNotFoundException {
        RestorePasswordParams restorePasswordParams = restorePasswordParamsMapper.toEntity(restorePasswordParamsDto);
        authService.restorePassword(restorePasswordParams);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/is-username-busy")
    public ResponseEntity<?> isUsernameBusy(@RequestParam("username") String username) {
        Boolean isBusy = authService.isUsernameBusy(username);
        return ResponseEntity.ok(isBusy);
    }

    @GetMapping("/is-email-busy")
    public ResponseEntity<?> isEmailBusy(@RequestParam("email") String email) {
        Boolean isBusy = authService.isEmailBusy(email);
        return ResponseEntity.ok(isBusy);
    }

    @GetMapping("/is-phone-number-busy")
    public ResponseEntity<?> isPhoneNumberBusy(@RequestParam("phoneNumber") String phoneNumber) {
        Boolean isBusy = authService.isPhoneNumberBusy(phoneNumber);
        return ResponseEntity.ok(isBusy);
    }

    @GetMapping("/is-restore-password-allowed")
    public ResponseEntity<?> restorePasswordAllowed(@RequestParam("email") String email) throws UserNotFoundException {
        Boolean isAllowed = authService.isRestorePasswordAllowed(email);
        return ResponseEntity.ok(isAllowed);
    }

}
