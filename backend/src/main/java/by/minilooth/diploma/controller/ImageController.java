package by.minilooth.diploma.controller;

import by.minilooth.diploma.config.consts.ApiConsts;
import by.minilooth.diploma.dto.mapper.ImageMapper;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.dto.ImageDto;
import by.minilooth.diploma.service.common.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@RequestMapping(ApiConsts.IMAGE_API_URI)
@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper imageMapper;

    @GetMapping("/{filename}")
    public ResponseEntity<?> get(@PathVariable("filename") String filename) throws FileNotFoundException {
        FileSystemResource fsr = imageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=%s", filename))
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fsr);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {
        Image image = imageService.upload(file);
        ImageDto imageDto = imageMapper.toDto(image);
        return ResponseEntity.ok(imageDto);
    }

}
