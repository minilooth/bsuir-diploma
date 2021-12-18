package by.minilooth.diploma.models.bean.cart;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.keys.CartItemKey;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Store;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "cart_item")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode
public class CartItem implements BaseEntity {

    @EmbeddedId
    private CartItemKey id;

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @MapsId("cartId")
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @MapsId("sparePartId")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

}
