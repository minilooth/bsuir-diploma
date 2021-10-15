package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.SparePart;

import java.util.List;

public interface SparePartService {

    void save(SparePart sparePart);
    void delete(SparePart sparePart);
    SparePart getById(Long id) throws SparePartNotFoundException;
    List<SparePart> getAll();

}
