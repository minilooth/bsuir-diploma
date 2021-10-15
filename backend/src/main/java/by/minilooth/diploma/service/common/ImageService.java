package by.minilooth.diploma.service.common;

import by.minilooth.diploma.models.bean.common.Image;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;

public interface ImageService {

    void save(Image image);
    void delete(Image image);
    Optional<Image> getByFilename(String filename);
    Image upload(MultipartFile file) throws IOException;
    FileSystemResource load(String filename) throws FileNotFoundException;

}
