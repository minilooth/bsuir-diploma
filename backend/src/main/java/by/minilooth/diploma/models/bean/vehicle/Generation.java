package by.minilooth.diploma.models.bean.vehicle;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.vehicle.builders.GenerationBuilder;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "generation")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Generation extends AbstractEntity implements Comparable<Generation> {

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @Override
    public int compareTo(Generation o) {
        int compare = o.getName().compareTo(name);
        if (compare != 0) {
            return compare;
        }
        return o.getModel().compareTo(model);
    }

    public static GenerationBuilder builder() {
        return new GenerationBuilder();
    }

}
