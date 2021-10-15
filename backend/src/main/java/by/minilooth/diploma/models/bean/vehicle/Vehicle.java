package by.minilooth.diploma.models.bean.vehicle;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.enums.EngineType;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "vehicle")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Vehicle extends AbstractEntity {

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "make_id", nullable = false)
    private Make make;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "generation_id")
    private Generation generation;

    @Column(name = "engine_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private EngineType engineType;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private Set<SparePart> spareParts;

}
