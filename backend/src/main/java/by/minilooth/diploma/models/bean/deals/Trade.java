package by.minilooth.diploma.models.bean.deals;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.deals.Deal;
import by.minilooth.diploma.models.bean.keys.TradeKey;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "trade")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Trade implements BaseEntity {

    @EmbeddedId
    private TradeKey id;

    @ManyToOne
    @MapsId("deal")
    @JoinColumn(name = "deal_id", nullable = false)
    private Deal deal;

    @ManyToOne
    @MapsId("sparePart")
    @JoinColumn(name = "spare_part_id", nullable = false)
    private SparePart sparePart;

    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

}
