package by.minilooth.diploma.common.api.builder;

public abstract class AbstractBuilder<T> implements Builder<T> {

    protected T entity;

    @Override
    public final T build() {
        return entity;
    }

}
