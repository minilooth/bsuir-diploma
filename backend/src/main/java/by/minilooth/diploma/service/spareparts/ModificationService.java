package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.spareparts.ModificationNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Modification;

import java.util.List;

public interface ModificationService {

    void save(Modification modification);
    void delete(Modification modification);
    Modification getById(Long id) throws ModificationNotFoundException;
    List<Modification> getAll();

}
