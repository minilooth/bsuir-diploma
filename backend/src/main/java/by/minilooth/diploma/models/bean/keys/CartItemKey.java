package by.minilooth.diploma.models.bean.keys;

import by.minilooth.diploma.models.api.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemKey implements Serializable, BaseEntity {

    @Column(name = "cart_id")
    private Long cartId;

    @Column(name = "spare_part_id")
    private Long sparePartId;

}
