package by.minilooth.diploma.models.bean.keys;

import by.minilooth.diploma.models.bean.deals.Deal;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class TradeKey implements Serializable {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "spare_part_id")
    private SparePart sparePart;

}
