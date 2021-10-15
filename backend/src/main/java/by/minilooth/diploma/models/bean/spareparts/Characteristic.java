package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.keys.CharacteristicKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "characteristic")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Characteristic implements BaseEntity {

    @EmbeddedId
    private CharacteristicKey id;

    @ManyToOne
    @MapsId("sparePart")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @ManyToOne
    @MapsId("modification")
    @JoinColumn(name = "modification_id", nullable = false)
    private Modification modification;

    @Column(name = "value", nullable = false)
    private String value;

}
