package by.minilooth.diploma.models.bean.stores;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.keys.AvailabilityKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "availability")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Availability implements BaseEntity {

    @EmbeddedId
    private AvailabilityKey id;

    @ManyToOne
    @MapsId("store")
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToOne
    @MapsId("sparePart")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @Column(name = "quantity", nullable = false)
    @Builder.Default
    private Integer quantity = 0;

}
