package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.repository.spareparts.SparePartRepository;
import by.minilooth.diploma.service.spareparts.SparePartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class SparePartServiceImpl implements SparePartService {

    private final SparePartRepository sparePartRepository;

    @Override
    public void save(SparePart sparePart) {
        sparePartRepository.save(sparePart);
    }

    @Override
    public void delete(SparePart sparePart) {
        sparePartRepository.delete(sparePart);
    }

    @Override
    public SparePart getById(Long id) throws SparePartNotFoundException {
        return sparePartRepository.findById(id).orElseThrow(() -> new SparePartNotFoundException(id));
    }

    @Override
    public List<SparePart> getAll() {
        return sparePartRepository.findAll();
    }
}
