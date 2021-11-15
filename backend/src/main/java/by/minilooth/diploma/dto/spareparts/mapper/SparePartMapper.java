package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.mapper.ImageMapper;
import by.minilooth.diploma.dto.spareparts.SparePartDto;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.CategoryMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.GroupMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.SubcategoryMapper;
import by.minilooth.diploma.dto.spareparts.manufacturer.mapper.ManufacturerMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.GenerationMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.MakeMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.ModelBeanMapper;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.nbrb.service.NbRbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.stream.Collectors;

@Component
public class SparePartMapper extends AbstractMapper<SparePart, SparePartDto> {

    @Autowired private ManufacturerMapper manufacturerMapper;
    @Autowired private CharacteristicMapper characteristicMapper;
    @Autowired private AvailabilityMapper availabilityMapper;
    @Autowired private MakeMapper makeMapper;
    @Autowired private ModelBeanMapper modelBeanMapper;
    @Autowired private GenerationMapper generationMapper;
    @Autowired private CategoryMapper categoryMapper;
    @Autowired private SubcategoryMapper subcategoryMapper;
    @Autowired private GroupMapper groupMapper;
    @Autowired private ImageMapper imageMapper;
    @Autowired private NbRbService nbRbService;

    public SparePartMapper() {
        super(SparePart.class, SparePartDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(SparePart.class, SparePartDto.class)
                .addMappings(m -> {
                    m.skip(SparePartDto::setManufacturer);
                    m.skip(SparePartDto::setCharacteristics);
                    m.skip(SparePartDto::setAvailabilities);
                    m.skip(SparePartDto::setMake);
                    m.skip(SparePartDto::setModel);
                    m.skip(SparePartDto::setGeneration);
                    m.skip(SparePartDto::setCategory);
                    m.skip(SparePartDto::setSubcategory);
                    m.skip(SparePartDto::setGroup);
                    m.skip(SparePartDto::setImage);
                    m.skip(SparePartDto::setTotalQuantity);
                    m.skip(SparePartDto::setRetailPriceUsd);
                    m.skip(SparePartDto::setRetailPriceEur);
                    m.skip(SparePartDto::setPurchasePriceUsd);
                    m.skip(SparePartDto::setPurchasePriceEur);
                }).setPostConverter(toDtoConverter());
    }

    @Override
    public void mapSpecificFields(SparePart source, SparePartDto destination) {
        destination.setManufacturer(manufacturerMapper.toDto(source.getManufacturer()));
        destination.setCharacteristics(characteristicMapper.toDto(source.getCharacteristics().stream()
                .sorted(Comparator.comparing(characteristic -> characteristic.getModification().getName()))
                .collect(Collectors.toList())));
        destination.setAvailabilities(availabilityMapper.toDto(source.getAvailabilities().stream()
                .sorted(Comparator.comparing(availability -> availability.getStore().getName()))
                .collect(Collectors.toList())));
        destination.setMake(makeMapper.toDto(source.getMake()));
        destination.setModel(modelBeanMapper.toDto(source.getModel()));
        destination.setGeneration(generationMapper.toDto(source.getGeneration()));
        destination.setCategory(categoryMapper.toDto(source.getCategory()));
        destination.setSubcategory(subcategoryMapper.toDto(source.getSubcategory()));
        destination.setGroup(groupMapper.toDto(source.getGroup()));
        destination.setImage(imageMapper.toDto(source.getImage()));
        destination.setTotalQuantity(source.getAvailabilities().stream().mapToLong(Availability::getQuantity).sum());
        destination.setRetailPriceUsd(nbRbService.convertToUSD(source.getRetailPrice()));
        destination.setRetailPriceEur(nbRbService.convertToEUR(source.getRetailPrice()));
        destination.setPurchasePriceUsd(nbRbService.convertToUSD(source.getPurchasePrice()));
        destination.setPurchasePriceEur(nbRbService.convertToEUR(source.getPurchasePrice()));
    }
}
