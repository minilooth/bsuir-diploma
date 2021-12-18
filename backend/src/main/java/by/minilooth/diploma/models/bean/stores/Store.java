package by.minilooth.diploma.models.bean.stores;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.cart.CartItem;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.common.enums.StoreType;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "store")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Store extends AbstractEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private StoreType type;

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @OneToMany(mappedBy = "store", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    private Set<Availability> availabilities = new HashSet<>();

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinTable(name = "store_image",
            joinColumns =
                    { @JoinColumn(name = "store_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "image_id", referencedColumnName = "id") })
    private Image image;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<CartItem> cartItems = new HashSet<>();

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

}
