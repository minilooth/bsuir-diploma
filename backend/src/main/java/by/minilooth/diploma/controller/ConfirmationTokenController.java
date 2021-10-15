package by.minilooth.diploma.controller;

import by.minilooth.diploma.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/confirmation-token")
@RequiredArgsConstructor
public class ConfirmationTokenController {

    private final UserService userService;

    @GetMapping("/confirm")
    private ResponseEntity<?> confirm(@RequestParam("token") String token) {
        userService.confirmEmail(token);
        return ResponseEntity.ok().build();
    }

}
