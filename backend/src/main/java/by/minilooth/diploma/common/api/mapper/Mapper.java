package by.minilooth.diploma.common.api.mapper;

import by.minilooth.diploma.dto.api.BaseDto;
import by.minilooth.diploma.models.api.BaseEntity;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collector;

public interface Mapper<E extends BaseEntity, D extends BaseDto> {

    E toEntity(D dto);
    D toDto(E entity);
    List<E> toEntity(Collection<D> dtos);
    List<D> toDto(Collection<E> entities);
    <C extends Collection<E>> C toEntity(Collection<D> dtos, Collector<E, ?, C> collector);
    <C extends Collection<D>> C toDto(Collection<E> entities, Collector<D, ?, C> collector);

    default void mapSpecificFields(E source, D destination) {
    }

    default void mapSpecificFields(D source, E destination) {
    }

}
