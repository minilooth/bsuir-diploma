package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.common.api.AbstractFilter;
import by.minilooth.diploma.common.enums.SparePartSort;
import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SparePartFilterDto extends AbstractFilter<SparePartSort> implements BaseDto {

    private Long manufacturerId;
    private String article;
    private String description;
    private Float purchasePriceFrom;
    private Float purchasePriceTo;
    private Float retailPriceFrom;
    private Float retailPriceTo;
    private Long availabilityFrom;
    private Long availabilityTo;
    private Long makeId;
    private Long modelId;
    private Long generationId;
    private Long categoryId;
    private Long subcategoryId;
    private Long groupId;

}
