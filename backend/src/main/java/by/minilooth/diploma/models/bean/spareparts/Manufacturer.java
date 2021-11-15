package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "manufacturer")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Manufacturer extends AbstractEntity implements Comparable<Manufacturer> {

    @Column(name = "name", nullable = false)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "manufacturer", cascade = CascadeType.ALL)
    private Set<SparePart> spareParts;

    @Override
    public int compareTo(Manufacturer o) {
        return o.getName().compareTo(name);
    }

}
