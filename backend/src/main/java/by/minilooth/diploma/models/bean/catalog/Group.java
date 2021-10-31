package by.minilooth.diploma.models.bean.catalog;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "tgroup")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = false)
public class Group extends AbstractEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

}
