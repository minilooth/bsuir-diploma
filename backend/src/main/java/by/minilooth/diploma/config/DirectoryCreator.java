package by.minilooth.diploma.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;

@Component
public class DirectoryCreator {

    private final static Logger LOGGER = LoggerFactory.getLogger(DirectoryCreator.class);

    public final static String IMAGES_DIRECTORY = "./image";

    @PostConstruct
    private void createDirectories() throws IOException {
        if (Files.notExists(Path.of(IMAGES_DIRECTORY), LinkOption.NOFOLLOW_LINKS)) {
            Files.createDirectory(Path.of(IMAGES_DIRECTORY));
            LOGGER.info("Created new directory: {}", IMAGES_DIRECTORY);
        }
    }

}
