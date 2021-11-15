package by.minilooth.diploma.models.bean.stores;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.keys.AvailabilityKey;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "availability")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode
public class Availability implements BaseEntity, Comparable<Availability> {

    @EmbeddedId
    @EqualsAndHashCode.Exclude
    private AvailabilityKey id;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @MapsId("storeId")
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @MapsId("sparePartId")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @Override
    public int compareTo(Availability o) {
        return 0;
    }
}
