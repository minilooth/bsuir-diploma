package by.minilooth.diploma.config;

import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.service.users.RoleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final static Logger LOGGER = LoggerFactory.getLogger(BeanConfig.class);
    private final static List<String> AUTHORITIES = List.of(
            Role.ADMIN,
            Role.EMPLOYEE
    );

    private final RoleService roleService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        List<String> authorities = roleService.getAll().stream().map(Role::getAuthority)
                .collect(Collectors.toList());
        AUTHORITIES.forEach(a -> {
            if (!authorities.contains(a)) {
                LOGGER.info("Authority {} not found. Inserting new authority...", a);
                roleService.save(Role.builder().authority(a).build());
            }
            else {
                LOGGER.info("Found authority: {}", a);
            }
        });
    }
}
