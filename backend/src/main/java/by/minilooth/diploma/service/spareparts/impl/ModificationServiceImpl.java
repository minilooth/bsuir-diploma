package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.spareparts.ModificationNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.repository.spareparts.ModificationRepository;
import by.minilooth.diploma.service.spareparts.ModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class ModificationServiceImpl implements ModificationService {

    private final ModificationRepository modificationRepository;

    @Override
    public void save(Modification modification) {
        modificationRepository.save(modification);
    }

    @Override
    public void delete(Modification modification) {
        modificationRepository.delete(modification);
    }

    @Override
    public Modification getById(Long id) throws ModificationNotFoundException {
        return modificationRepository.findById(id).orElseThrow(() -> new ModificationNotFoundException(id));
    }

    @Override
    public List<Modification> getAll() {
        return modificationRepository.findAll();
    }
}
