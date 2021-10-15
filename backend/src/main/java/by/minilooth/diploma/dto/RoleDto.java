package by.minilooth.diploma.dto;

import by.minilooth.diploma.dto.api.AbstractDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class RoleDto extends AbstractDto {

    private String authority;

}
