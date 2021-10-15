package by.minilooth.diploma.models.bean.keys;

import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class CharacteristicKey implements Serializable {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "spare_part_id")
    private SparePart sparePart;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "modification_id")
    private Modification modification;

}
