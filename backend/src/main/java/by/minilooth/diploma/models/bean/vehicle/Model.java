package by.minilooth.diploma.models.bean.vehicle;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.vehicle.builders.ModelBuilder;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "model")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Model extends AbstractEntity implements Comparable<Model> {

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "make_id", nullable = false)
    private Make make;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL)
    private Set<Generation> generations = new HashSet<>();

    @Override
    public int compareTo(Model o) {
        int compare = o.getName().compareTo(name);
        if (compare != 0) {
            return compare;
        }
        return o.getMake().compareTo(make);
    }

    public static ModelBuilder builder() {
        return new ModelBuilder();
    }

}
