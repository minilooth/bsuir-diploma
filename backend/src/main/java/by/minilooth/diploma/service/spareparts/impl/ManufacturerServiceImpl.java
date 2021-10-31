package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.spareparts.ManufacturerNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.spareparts.manufacturer.ProcessManufacturer;
import by.minilooth.diploma.repository.spareparts.ManufacturerRepository;
import by.minilooth.diploma.service.spareparts.ManufacturerService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired private ManufacturerRepository manufacturerRepository;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Manufacturer manufacturer) {
        manufacturerRepository.save(manufacturer);
    }

    @Override
    public Manufacturer save(ProcessManufacturer processManufacturer) {
        Manufacturer manufacturer = Manufacturer.builder()
                .name(processManufacturer.getName())
                .build();
        save(manufacturer);
        return manufacturer;
    }

    @Override
    public Manufacturer update(ProcessManufacturer processManufacturer, Long id) throws ManufacturerNotFoundException {
        Manufacturer manufacturer = getById(id).orElseThrow(() -> new ManufacturerNotFoundException(id));

        manufacturer.setName(processManufacturer.getName());

        save(manufacturer);
        return manufacturer;
    }

    @Override
    public void delete(Manufacturer manufacturer) {
        manufacturerRepository.delete(manufacturer);
    }

    @Override
    public Manufacturer delete(Long id) throws ManufacturerNotFoundException, ActionIsImpossibleException {
        Manufacturer manufacturer = getById(id).orElseThrow(() -> new ManufacturerNotFoundException(id));

        if (sparePartService.existsByManufacturer(manufacturer)) {
            throw new ActionIsImpossibleException("Невозможно удалить производителя который используется в запчасти");
        }

        delete(manufacturer);
        return manufacturer;
    }

    @Override
    public Optional<Manufacturer> getById(Long id) throws ManufacturerNotFoundException {
        return manufacturerRepository.findById(id);
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
