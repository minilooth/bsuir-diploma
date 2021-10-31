package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
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

    @OneToMany(mappedBy = "sparePart")
    private Set<Characteristic> characteristics;

    @OneToMany(mappedBy = "sparePart")
    private Set<Availability> availabilities;

    @ManyToOne
    @JoinColumn(name = "make_id", nullable = false)
    private Make make;

    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @ManyToOne
    @JoinColumn(name = "generation_id")
    private Generation generation;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

}
