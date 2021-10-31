package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import java.util.List;

@Data
public class StoreListDto implements BaseDto {

    private List<StoreDto> stores;
    private Long pages;

}
