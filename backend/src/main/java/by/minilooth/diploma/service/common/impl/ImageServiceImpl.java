package by.minilooth.diploma.service.common.impl;

import by.minilooth.diploma.config.DirectoryCreator;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.repository.common.ImageRepository;
import by.minilooth.diploma.service.common.FileService;
import by.minilooth.diploma.service.common.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    @Autowired private FileService fileService;
    @Autowired private ImageRepository imageRepository;

    @Override
    public void save(Image image) {
        imageRepository.save(image);
    }

    @Override
    public void delete(Image image) {
        imageRepository.delete(image);
    }

    @Override
    public Optional<Image> getByFilename(String filename) {
        return imageRepository.findByFilename(filename);
    }

    @Override
    public Image upload(MultipartFile file) throws IOException {
        String filename = fileService.uploadImage(String.format("%s/", DirectoryCreator.IMAGES_DIRECTORY), file.getInputStream());
        Image image = Image.builder()
                .filename(filename)
                .build();
        save(image);
        return image;
    }

    @Override
    public FileSystemResource load(String filename) throws FileNotFoundException {
        return fileService.get(String.format("%s/%s", DirectoryCreator.IMAGES_DIRECTORY, filename));
    }

}
