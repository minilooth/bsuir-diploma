package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "modification")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = false)
public class Modification extends AbstractEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "modification")
    @EqualsAndHashCode.Exclude
    private Set<Characteristic> characteristics;

}
