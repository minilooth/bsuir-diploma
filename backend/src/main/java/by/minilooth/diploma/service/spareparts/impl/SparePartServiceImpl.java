package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.spareparts.Characteristic;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
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

    @Override
    public Boolean existsByManufacturer(Manufacturer manufacturer) {
        return sparePartRepository.existsByManufacturer(manufacturer);
    }

    @Override
    public Boolean existsByMake(Make make) {
        return sparePartRepository.existsByMake(make);
    }

    @Override
    public Boolean existsByModel(Model model) {
        return sparePartRepository.existsByModel(model);
    }

    @Override
    public Boolean existsByGeneration(Generation generation) {
        return sparePartRepository.existsByGeneration(generation);
    }

    @Override
    public Boolean existsByCategory(Category category) {
        return sparePartRepository.existsByCategory(category);
    }

    @Override
    public Boolean existsBySubcategory(Subcategory subcategory) {
        return sparePartRepository.existsBySubcategory(subcategory);
    }

    @Override
    public Boolean existsByGroup(Group group) {
        return sparePartRepository.existsByGroup(group);
    }

    @Override
    public Boolean existsByModification(Modification modification) {
        return sparePartRepository.existsByCharacteristicsModification(modification);
    }
}
