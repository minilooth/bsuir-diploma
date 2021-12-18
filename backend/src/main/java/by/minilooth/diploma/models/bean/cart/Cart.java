package by.minilooth.diploma.models.bean.cart;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.users.User;
import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Data
@Builder
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart extends AbstractEntity {

    @OneToOne(mappedBy = "cart", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @OneToMany(mappedBy = "cart", targetEntity = CartItem.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    private Set<CartItem> items = new LinkedHashSet<>();

    public void setItems(Set<CartItem> items) {
        this.items.clear();
        if (Objects.nonNull(items)) {
            this.items.addAll(items);
        }
    }

    public void addItem(CartItem items) {
        this.items.add(items);
    }

}
