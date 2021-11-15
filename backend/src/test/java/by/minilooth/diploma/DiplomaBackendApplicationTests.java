package by.minilooth.diploma;

import by.minilooth.diploma.dto.LoginParamsDto;
import by.minilooth.diploma.dto.ProcessUserDto;
import by.minilooth.diploma.dto.RoleDto;
import by.minilooth.diploma.dto.UserDto;
import by.minilooth.diploma.models.bean.users.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.servlet.http.Cookie;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class DiplomaBackendApplicationTests {

    @Autowired private MockMvc mock;
    @Autowired private ObjectMapper mapper;

    @Test
    void shouldCreateAndDeleteEmployee() throws Exception {
        LoginParamsDto loginParamsDto = new LoginParamsDto();

        loginParamsDto.setUsername("minilooth123");
        loginParamsDto.setPassword("hkR3RhSiE2PnZ8RY");

        MvcResult loginResult = mock.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(loginParamsDto)))
                .andExpect(status().isOk())
                .andReturn();

        Cookie[] cookies = loginResult.getResponse().getCookies();

        ProcessUserDto processUserDto = new ProcessUserDto();

        processUserDto.setUsername(RandomStringUtils.randomAlphanumeric(10));
        processUserDto.setEmail(String.format("%s@%s.%s", RandomStringUtils.randomAlphanumeric(10),
                RandomStringUtils.randomAlphabetic(5), RandomStringUtils.randomAlphabetic(3)));
        processUserDto.setPhoneNumber(generateRandomPhoneNumber());
        processUserDto.setRole(new RoleDto(Role.EMPLOYEE));
        processUserDto.setFirstname(RandomStringUtils.randomAlphanumeric(10));
        processUserDto.setLastname(RandomStringUtils.randomAlphanumeric(10));
        processUserDto.setMiddlename(RandomStringUtils.randomAlphanumeric(10));

        MvcResult createResult = mock.perform(put("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(processUserDto))
                .cookie(cookies))
                .andExpect(status().isOk())
                .andReturn();

        UserDto user = mapper.readValue(createResult.getResponse().getContentAsString(), UserDto.class);

        mock.perform(delete("/api/user/" + user.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(cookies))
                .andExpect(status().isOk());
    }

    @Test
    void shouldNotCreateEmployee() throws Exception {
        LoginParamsDto loginParamsDto = new LoginParamsDto();

        loginParamsDto.setUsername("minilooth123");
        loginParamsDto.setPassword("hkR3RhSiE2PnZ8RY");

        MvcResult loginResult = mock.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(loginParamsDto)))
                .andExpect(status().isOk())
                .andReturn();

        Cookie[] cookies = loginResult.getResponse().getCookies();

        ProcessUserDto processUserDto = new ProcessUserDto();

        processUserDto.setUsername("minilooth123");
        processUserDto.setEmail(String.format("%s@%s.%s", RandomStringUtils.randomAlphanumeric(10),
                RandomStringUtils.randomAlphabetic(5), RandomStringUtils.randomAlphabetic(3)));
        processUserDto.setPhoneNumber(generateRandomPhoneNumber());
        processUserDto.setRole(new RoleDto(Role.EMPLOYEE));
        processUserDto.setFirstname(RandomStringUtils.randomAlphanumeric(10));
        processUserDto.setLastname(RandomStringUtils.randomAlphanumeric(10));
        processUserDto.setMiddlename(RandomStringUtils.randomAlphanumeric(10));

        mock.perform(put("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(processUserDto))
                .cookie(cookies))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldAuthorizeUser() throws Exception {
        LoginParamsDto loginParamsDto = new LoginParamsDto();

        loginParamsDto.setUsername("minilooth123");
        loginParamsDto.setPassword("hkR3RhSiE2PnZ8RY");

        mock.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(loginParamsDto)))
                .andExpect(status().isOk());
    }

    @Test
    void shouldNotAuthorizeUser() throws Exception {
        LoginParamsDto loginParamsDto = new LoginParamsDto();

        loginParamsDto.setUsername("minilooth123");
        loginParamsDto.setPassword("WRONG_PASSWORD");

        mock.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(loginParamsDto)))
                .andExpect(status().isUnauthorized());
    }

    private String generateRandomPhoneNumber() {
        return "+375(" +
                RandomStringUtils.randomNumeric(2) +
                ")" +
                RandomStringUtils.randomNumeric(3) +
                "-" +
                RandomStringUtils.randomNumeric(2) +
                "-" +
                RandomStringUtils.randomNumeric(2);
    }

}
