package by.minilooth.diploma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileUploadDto {

    private String uri;
    private String filename;

}
