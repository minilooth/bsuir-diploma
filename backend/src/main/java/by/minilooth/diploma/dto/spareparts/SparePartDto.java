package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.dto.ImageDto;
import by.minilooth.diploma.dto.api.AbstractDto;
import by.minilooth.diploma.dto.spareparts.catalog.CategoryDto;
import by.minilooth.diploma.dto.spareparts.catalog.GroupDto;
import by.minilooth.diploma.dto.spareparts.catalog.SubcategoryDto;
import by.minilooth.diploma.dto.spareparts.manufacturer.ManufacturerDto;
import by.minilooth.diploma.dto.spareparts.vehicle.GenerationDto;
import by.minilooth.diploma.dto.spareparts.vehicle.MakeDto;
import by.minilooth.diploma.dto.spareparts.vehicle.ModelDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class SparePartDto extends AbstractDto {

    private String name;
    private ManufacturerDto manufacturer;
    private String article;
    private String description;
    private Float purchasePrice;
    private Float purchasePriceUsd;
    private Float purchasePriceEur;
    private Float retailPrice;
    private Float retailPriceUsd;
    private Float retailPriceEur;
    private List<CharacteristicDto> characteristics;
    private List<AvailabilityDto> availabilities;
    private Long totalQuantity;
    private MakeDto make;
    private ModelDto model;
    private GenerationDto generation;
    private CategoryDto category;
    private SubcategoryDto subcategory;
    private GroupDto group;
    private ImageDto image;

}
