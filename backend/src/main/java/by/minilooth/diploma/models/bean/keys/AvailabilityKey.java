package by.minilooth.diploma.models.bean.keys;

import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Store;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class AvailabilityKey implements Serializable {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "spare_part_id")
    private SparePart sparePart;

}
