package by.minilooth.diploma.models.bean.keys;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.deals.Deal;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TradeKey implements Serializable, BaseEntity {

    @Column(name = "deal_id")
    private Long dealId;

    @Column(name = "spare_part_id")
    private Long sparePartId;

}
