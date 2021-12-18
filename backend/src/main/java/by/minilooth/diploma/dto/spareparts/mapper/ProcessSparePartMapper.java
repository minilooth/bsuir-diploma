package by.minilooth.diploma.dto.spareparts.mapper;

import by.minilooth.diploma.common.api.mapper.AbstractMapper;
import by.minilooth.diploma.dto.mapper.ImageMapper;
import by.minilooth.diploma.dto.spareparts.ProcessSparePartDto;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.CategoryMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.GroupMapper;
import by.minilooth.diploma.dto.spareparts.catalog.mapper.SubcategoryMapper;
import by.minilooth.diploma.dto.spareparts.manufacturer.mapper.ManufacturerMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.GenerationMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.MakeMapper;
import by.minilooth.diploma.dto.spareparts.vehicle.mapper.ModelBeanMapper;
import by.minilooth.diploma.models.spareparts.ProcessSparePart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ProcessSparePartMapper extends AbstractMapper<ProcessSparePart, ProcessSparePartDto> {

    @Autowired private ManufacturerMapper manufacturerMapper;
    @Autowired private CharacteristicMapper characteristicMapper;
    @Autowired private MakeMapper makeMapper;
    @Autowired private ModelBeanMapper modelBeanMapper;
    @Autowired private GenerationMapper generationMapper;
    @Autowired private CategoryMapper categoryMapper;
    @Autowired private SubcategoryMapper subcategoryMapper;
    @Autowired private GroupMapper groupMapper;
    @Autowired private ImageMapper imageMapper;

    public ProcessSparePartMapper() {
        super(ProcessSparePart.class, ProcessSparePartDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(ProcessSparePartDto.class, ProcessSparePart.class)
                .addMappings(m -> {
                    m.skip(ProcessSparePart::setManufacturer);
                    m.skip(ProcessSparePart::setCharacteristics);
                    m.skip(ProcessSparePart::setMake);
                    m.skip(ProcessSparePart::setModel);
                    m.skip(ProcessSparePart::setGeneration);
                    m.skip(ProcessSparePart::setCategory);
                    m.skip(ProcessSparePart::setSubcategory);
                    m.skip(ProcessSparePart::setGroup);
                    m.skip(ProcessSparePart::setImage);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(ProcessSparePartDto source, ProcessSparePart destination) {
        destination.setManufacturer(manufacturerMapper.toEntity(source.getManufacturer()));
        destination.setCharacteristics(characteristicMapper.toEntity(source.getCharacteristics()));
        destination.setMake(makeMapper.toEntity(source.getMake()));
        destination.setModel(modelBeanMapper.toEntity(source.getModel()));
        destination.setGeneration(generationMapper.toEntity(source.getGeneration()));
        destination.setCategory(categoryMapper.toEntity(source.getCategory()));
        destination.setSubcategory(subcategoryMapper.toEntity(source.getSubcategory()));
        destination.setGroup(groupMapper.toEntity(source.getGroup()));
        destination.setImage(imageMapper.toEntity(source.getImage()));
    }

}
