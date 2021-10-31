package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.spareparts.ModificationNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.spareparts.characteristic.ProcessModification;

import java.util.List;
import java.util.Optional;

public interface ModificationService {

    void save(Modification modification);
    Modification save(ProcessModification processModification);
    Modification update(ProcessModification processModification, Long id) throws ModificationNotFoundException;
    void delete(Modification modification);
    Modification delete(Long id) throws ModificationNotFoundException, ActionIsImpossibleException;
    Optional<Modification> getById(Long id);
    List<Modification> getAll();

}
