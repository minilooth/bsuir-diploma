package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.vehicle.Vehicle;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "spare_part")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class SparePart extends AbstractEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "manufacturer_id", nullable = false)
    private Manufacturer manufacturer;

    @Column(name = "article", nullable = false)
    private Integer article;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "purchase_price", nullable = false)
    private Float purchasePrice;

    @Column(name = "retail_price", nullable = false)
    private Float retailPrice;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @OneToMany(mappedBy = "sparePart")
    private Set<Characteristic> characteristics;

    @OneToMany(mappedBy = "sparePart")
    private Set<Availability> availabilities;

}
