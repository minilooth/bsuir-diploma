package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.models.bean.cart.CartItem;
import by.minilooth.diploma.models.bean.deals.Trade;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Objects;
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
    private String article;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "purchase_price", nullable = false)
    private Float purchasePrice;

    @Column(name = "retail_price", nullable = false)
    private Float retailPrice;

    @OneToMany(mappedBy = "sparePart", targetEntity = Characteristic.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private Set<Characteristic> characteristics = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sparePart", targetEntity = Availability.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private Set<Availability> availabilities = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sparePart", targetEntity = CartItem.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private Set<CartItem> cartItems = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sparePart", targetEntity = Trade.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private Set<Trade> trades = new LinkedHashSet<>();

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

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinTable(name = "spare_part_image",
            joinColumns =
                    { @JoinColumn(name = "spare_part_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "image_id", referencedColumnName = "id") })
    private Image image;

    public void setCharacteristics(Set<Characteristic> characteristics) {
        this.characteristics.clear();
        if (Objects.nonNull(characteristics)) {
            this.characteristics.addAll(characteristics);
        }
    }

    public void setAvailabilities(Set<Availability> availabilities) {
        this.availabilities.clear();
        if (Objects.nonNull(availabilities)) {
            this.availabilities.addAll(availabilities);
        }
    }

    public void setCartItems(Set<CartItem> cartItems) {
        this.cartItems.clear();
        if (Objects.nonNull(cartItems)) {
            this.cartItems.addAll(cartItems);
        }
    }

    public void setTrades(Set<Trade> trades) {
        this.trades.clear();
        if (Objects.nonNull(trades)) {
            this.trades.addAll(trades);
        }
    }

}
