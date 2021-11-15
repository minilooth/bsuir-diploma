package by.minilooth.diploma.models.spareparts;

import by.minilooth.diploma.common.api.AbstractEntityList;
import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import lombok.*;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SparePartList extends AbstractEntityList implements BaseEntity {

    private List<SparePart> spareParts;

}
