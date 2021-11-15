package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.common.api.AbstractEntityList;
import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class SparePartListDto extends AbstractEntityList implements BaseDto {

    private List<SparePartDto> spareParts;

}
