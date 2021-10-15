package by.minilooth.diploma.models.bean.vehicle;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "generation")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = false)
public class Generation extends AbstractEntity {

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "generation", cascade = CascadeType.ALL)
    private Set<Vehicle> vehicles = new HashSet<>();

}
