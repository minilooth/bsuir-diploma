package by.minilooth.diploma.service.common.impl;

import by.minilooth.diploma.service.common.FileService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public FileSystemResource get(String path) throws FileNotFoundException {
        File file = new File(path);

        if (!file.exists()) {
            throw new FileNotFoundException(String.format("Не удалось найти файл по адресу: %s", path));
        }

        return new FileSystemResource(file);
    }

    @Override
    public String uploadImage(String path, InputStream is) throws IOException {
        String filename = generateFilename(path, DEFAULT_IMAGE_FORMAT);
        FileOutputStream fos = new FileOutputStream(path + filename);
        BufferedImage image = ImageIO.read(is);
        BufferedImage converted = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_RGB);

        converted.createGraphics().drawImage(image, 0, 0, Color.WHITE, null);

        boolean written = ImageIO.write(converted, DEFAULT_IMAGE_FORMAT, fos);

        is.close();
        fos.close();

        if (!written) {
            throw new IllegalStateException("Не удалось записать изображение");
        }

        return filename;
    }

    private String generateFilename(String path, String extension) {
        String filename;

        do {
            filename = RandomStringUtils.randomAlphanumeric(GENERATED_FILENAME_LENGTH);
        }
        while(new File(String.format("%s%s.%s", path, filename, extension)).exists());

        return String.format("%s.%s", filename, extension);
    }

}
