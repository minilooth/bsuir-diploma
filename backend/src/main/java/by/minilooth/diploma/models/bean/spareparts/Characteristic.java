package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.keys.CharacteristicKey;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "characteristic")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@EqualsAndHashCode
public class Characteristic implements BaseEntity {

    @EmbeddedId
    private CharacteristicKey id;

    @ManyToOne
    @MapsId("sparePartId")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @ManyToOne
    @MapsId("modificationId")
    @JoinColumn(name = "modification_id", nullable = false)
    private Modification modification;

    @Column(name = "value", nullable = false)
    private String value;

}
