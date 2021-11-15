package by.minilooth.diploma.dto.spareparts;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.dto.spareparts.catalog.CategoryDto;
import by.minilooth.diploma.dto.spareparts.catalog.GroupDto;
import by.minilooth.diploma.dto.spareparts.catalog.SubcategoryDto;
import by.minilooth.diploma.dto.spareparts.manufacturer.ManufacturerDto;
import by.minilooth.diploma.dto.spareparts.vehicle.GenerationDto;
import by.minilooth.diploma.dto.spareparts.vehicle.MakeDto;
import by.minilooth.diploma.dto.spareparts.vehicle.ModelDto;
import lombok.Data;

import java.util.List;

@Data
public class ProcessSparePartDto implements BaseDto {

    private String name;
    private ManufacturerDto manufacturer;
    private Integer article;
    private String description;
    private Float purchasePrice;
    private Float retailPrice;
    private List<CharacteristicDto> characteristics;
    private MakeDto make;
    private ModelDto model;
    private GenerationDto generation;
    private CategoryDto category;
    private SubcategoryDto subcategory;
    private GroupDto group;

}
