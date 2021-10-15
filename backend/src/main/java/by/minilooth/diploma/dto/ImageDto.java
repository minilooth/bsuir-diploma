package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ImageDto extends AbstractDto {

    private String uri;

}
