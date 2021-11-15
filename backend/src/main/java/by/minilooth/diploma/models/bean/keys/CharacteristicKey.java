package by.minilooth.diploma.models.bean.keys;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CharacteristicKey implements Serializable, BaseEntity {

    @Column(name = "spare_part_id")
    private Long sparePartId;

    @Column(name = "modification_id")
    private Long modificationId;

}
