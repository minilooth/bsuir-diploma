package by.minilooth.diploma.models.bean.vehicle;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.vehicle.builders.MakeBuilder;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "make")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Make extends AbstractEntity implements Comparable<Make> {

    @Column(name = "name", nullable = false, unique = true, length = 40)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "make", cascade = CascadeType.ALL)
    private Set<Model> models = new HashSet<>();

    @Override
    public int compareTo(Make o) {
        return o.getName().compareTo(name);
    }

    public static MakeBuilder builder() {
        return new MakeBuilder();
    }
}
