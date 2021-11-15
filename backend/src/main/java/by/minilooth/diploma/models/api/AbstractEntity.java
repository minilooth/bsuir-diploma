package by.minilooth.diploma.models.api;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@EqualsAndHashCode
@Data
public abstract class AbstractEntity implements Serializable, BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    protected Long id;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdAt;

    @Column(name = "updated_at", insertable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected Date updatedAt;

    @PrePersist
    public void toCreate() {
        createdAt = new Date();
    }

    @PreUpdate
    public void toUpdate() {
        updatedAt = new Date();
    }

}
