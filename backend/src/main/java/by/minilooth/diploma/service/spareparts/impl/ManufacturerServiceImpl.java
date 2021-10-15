package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.spareparts.ManufacturerNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.repository.spareparts.ManufacturerRepository;
import by.minilooth.diploma.service.spareparts.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class ManufacturerServiceImpl implements ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    @Override
    public void save(Manufacturer manufacturer) {
        manufacturerRepository.save(manufacturer);
    }

    @Override
    public void delete(Manufacturer manufacturer) {
        manufacturerRepository.delete(manufacturer);
    }

    @Override
    public void deleteById(Long id) throws ManufacturerNotFoundException {
        delete(getById(id));
    }

    @Override
    public Manufacturer getById(Long id) throws ManufacturerNotFoundException {
        return manufacturerRepository.findById(id).orElseThrow(() -> new ManufacturerNotFoundException(id));
    }

    @Override
    public List<Manufacturer> getAll() {
        return manufacturerRepository.findAll();
    }

    @Override
    public List<Manufacturer> getAll(Optional<String> name) {
        if (name.isPresent()) {
            return manufacturerRepository.findAllByNameStartingWith(name.get());
        }
        return getAll();
    }
}
