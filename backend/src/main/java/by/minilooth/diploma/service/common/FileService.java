package by.minilooth.diploma.service.common;

import org.springframework.core.io.FileSystemResource;

import java.io.*;

public interface FileService {

    Integer GENERATED_FILENAME_LENGTH = 16;
    String DEFAULT_IMAGE_FORMAT = "jpg";

    FileSystemResource get(String path) throws FileNotFoundException;
    String uploadImage(String path, InputStream is) throws IOException;

}
