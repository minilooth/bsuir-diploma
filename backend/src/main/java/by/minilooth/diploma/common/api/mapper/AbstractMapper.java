package by.minilooth.diploma.common.api.mapper;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.models.api.BaseEntity;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public abstract class AbstractMapper<E extends BaseEntity, D extends BaseDto> implements Mapper<E, D> {

    @Autowired protected ModelMapper mapper;

    private final Class<E> entityClass;
    private final Class<D> dtoClass;

    protected AbstractMapper(Class<E> entityClass, Class<D> dtoClass) {
        this.entityClass = entityClass;
        this.dtoClass = dtoClass;
    }

    @Override
    public E toEntity(D dto) {
        return Objects.isNull(dto)
                ? null
                : mapper.map(dto, entityClass);
    }

    @Override
    public D toDto(E entity) {
        return Objects.isNull(entity)
                ? null
                : mapper.map(entity, dtoClass);
    }

    @Override
    public List<E> toEntity(Collection<D> dtos) {
        if (Objects.isNull(dtos)) {
            return null;
        }
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    @Override
    public List<D> toDto(Collection<E> entities) {
        if (Objects.isNull(entities)) {
            return null;
        }
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public <C extends Collection<E>> C toEntity(Collection<D> dtos, Collector<E, ?, C> collector) {
        if (Objects.isNull(dtos)) {
            return null;
        }
        return dtos.stream().map(this::toEntity).collect(collector);
    }

    @Override
    public <C extends Collection<D>> C toDto(Collection<E> entities, Collector<D, ?, C> collector) {
        if (Objects.isNull(entities)) {
            return null;
        }
        return entities.stream().map(this::toDto).collect(collector);
    }

    public Converter<E, D> toDtoConverter() {
        return context -> {
            E source = context.getSource();
            D destination = context.getDestination();
            mapSpecificFields(source, destination);
            return context.getDestination();
        };
    }

    public Converter<D, E> toEntityConverter() {
        return context -> {
            D source = context.getSource();
            E destination = context.getDestination();
            mapSpecificFields(source, destination);
            return context.getDestination();
        };
    }

}
