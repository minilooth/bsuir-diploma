package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.spareparts.ModificationNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.spareparts.characteristic.ProcessModification;
import by.minilooth.diploma.repository.spareparts.ModificationRepository;
import by.minilooth.diploma.service.spareparts.ModificationService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ModificationServiceImpl implements ModificationService {

    @Autowired private ModificationRepository modificationRepository;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Modification modification) {
        modificationRepository.save(modification);
    }

    @Override
    public Modification save(ProcessModification processModification) {
        Modification modification = Modification.builder()
                .name(processModification.getName())
                .build();
        save(modification);
        return modification;
    }

    @Override
    public Modification update(ProcessModification processModification, Long id) throws ModificationNotFoundException {
        Modification modification = getById(id).orElseThrow(() -> new ModificationNotFoundException(id));

        modification.setName(processModification.getName());

        save(modification);
        return modification;
    }

    @Override
    public void delete(Modification modification) {
        modificationRepository.delete(modification);
    }

    @Override
    public Modification delete(Long id) throws ModificationNotFoundException, ActionIsImpossibleException {
        Modification modification = getById(id).orElseThrow(() -> new ModificationNotFoundException(id));

        if (sparePartService.existsByModification(modification)) {
            throw new ActionIsImpossibleException("Невозможно удалить модификацию которая существует в запчасти");
        }

        delete(modification);
        return modification;
    }

    @Override
    public Optional<Modification> getById(Long id) {
        return modificationRepository.findById(id);
    }

    @Override
    public List<Modification> getAll() {
        return modificationRepository.findAll();
    }
}
