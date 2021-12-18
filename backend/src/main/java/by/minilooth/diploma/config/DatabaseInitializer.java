package by.minilooth.diploma.config;

import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.common.Config;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.service.common.ConfigService;
import by.minilooth.diploma.service.users.RoleService;
import by.minilooth.diploma.service.users.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.management.relation.RoleNotFoundException;
import javax.persistence.EntityManager;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DatabaseInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final static Logger LOGGER = LoggerFactory.getLogger(BeanConfig.class);
    private final static List<String> AUTHORITIES = List.of(
            Role.ADMIN,
            Role.EMPLOYEE
    );
    private final static String INITIAL_SQL_FILE_PATH = "classpath:initialize.sql";

    @Autowired private RoleService roleService;
    @Autowired private ConfigService configService;
    @Autowired private EntityManager entityManager;
    @Autowired private UserService userService;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        List<String> authorities = roleService.getAll().stream().map(Role::getAuthority)
                .collect(Collectors.toList());
        AUTHORITIES.forEach(a -> {
            if (!authorities.contains(a)) {
                LOGGER.info("Authority {} not found. Inserting new authority...", a);
                roleService.save(Role.builder().authority(a).build());
                LOGGER.info("Authority {} successfully inserted", a);
            }
            else {
                LOGGER.info("Found authority: {}", a);
            }
        });
        Boolean initialized = configService.getBooleanValue(Config.INITIALIZED);
        if (Objects.isNull(initialized) || !initialized) {
            entityManager.getTransaction().begin();
            LOGGER.info(String.format("Property not found: %s", Config.INITIALIZED));
            configService.save(Config.builder()
                            .key(Config.INITIALIZED)
                            .value("true")
                            .type(Config.ValueType.BOOLEAN)
                            .build());
            LOGGER.info(String.format("Inserted property: %s", Config.INITIALIZED));
            LOGGER.info("Inserting initial data...");
            try {
                File file = ResourceUtils.getFile(INITIAL_SQL_FILE_PATH);
                String sql = new String(Files.readAllBytes(file.toPath()));
                entityManager.createNativeQuery(sql).executeUpdate();
                LOGGER.info("Initial data inserted");
            }
            catch (IOException ex) {
                LOGGER.error("Unable to open initialize.sql");
            }
            try {
                LOGGER.info("Inserting initial admin...");
                Role role = roleService.getByAuthority(Role.ADMIN)
                        .orElseThrow(() -> new RoleNotFoundException(Role.ADMIN));
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .firstname("Admin")
                        .lastname("Admin")
                        .middlename("Admin")
                        .email("example@example.com")
                        .phoneNumber("+375(12)345-67-89")
                        .isAccountNonDisabled(true)
                        .isAccountNonLocked(true)
                        .isEmailConfirmed(true)
                        .cart(Cart.builder().build())
                        .authorities(new HashSet<>(Set.of(role)))
                        .build();
                userService.save(user);
                entityManager.getTransaction().commit();
            }
            catch (RoleNotFoundException ex) {
                entityManager.getTransaction().rollback();
                LOGGER.error(ex.getMessage());
            }
        }

    }
}
