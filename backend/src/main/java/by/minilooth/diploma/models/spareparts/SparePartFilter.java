package by.minilooth.diploma.models.spareparts;

import by.minilooth.diploma.common.api.AbstractFilter;
import by.minilooth.diploma.common.enums.SparePartSort;
import by.minilooth.diploma.models.api.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SparePartFilter extends AbstractFilter<SparePartSort> implements BaseEntity {

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
