package by.minilooth.diploma.models.bean.deals;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.keys.TradeKey;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "trade")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode
public class Trade implements BaseEntity {

    @EmbeddedId
    private TradeKey id;

    @ManyToOne
    @MapsId("dealId")
    @JoinColumn(name = "deal_id", nullable = false)
    private Deal deal;

    @ManyToOne
    @MapsId("sparePartId")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @Column(name = "purchase_price", nullable = false)
    private Float purchasePrice;

    @Column(name = "retail_price", nullable = false)
    private Float retailPrice;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

}
