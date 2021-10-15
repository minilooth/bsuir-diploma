package by.minilooth.diploma.dto.mapper;

import by.minilooth.diploma.config.consts.ApiConsts;
import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.ImageDto;
import by.minilooth.diploma.models.bean.common.Image;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ImageMapper extends AbstractMapper<Image, ImageDto> {

    public ImageMapper() {
        super(Image.class, ImageDto.class);
    }

    @PostConstruct
    private void setupMapper() {
        mapper.createTypeMap(Image.class, ImageDto.class)
                .addMappings(m -> m.skip(ImageDto::setUri)).setPostConverter(toDtoConverter());
        mapper.createTypeMap(ImageDto.class, Image.class)
                .addMappings(m -> {
                    m.skip(Image::setFilename);
                    m.skip(Image::setUser);
                }).setPostConverter(toEntityConverter());
    }

    @Override
    public void mapSpecificFields(Image source, ImageDto destination) {
        destination.setUri(String.format("%s/%s", ApiConsts.IMAGE_API_URI, source.getFilename()));
    }

    @Override
    public void mapSpecificFields(ImageDto source, Image destination) {
        destination.setFilename(source.getUri().replace(String.format("%s/", ApiConsts.IMAGE_API_URI), ""));
    }

}
