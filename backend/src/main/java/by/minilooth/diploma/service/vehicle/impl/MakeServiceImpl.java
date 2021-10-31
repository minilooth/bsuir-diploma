package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessMake;
import by.minilooth.diploma.repository.vehicle.MakeRepository;
import by.minilooth.diploma.service.spareparts.SparePartService;
import by.minilooth.diploma.service.vehicle.MakeService;
import by.minilooth.diploma.service.vehicle.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MakeServiceImpl implements MakeService {

    @Autowired private MakeRepository makeRepository;
    @Autowired private ModelService modelService;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Make make) {
        makeRepository.save(make);
    }

    @Override
    public Make save(ProcessMake processMake) {
        Make make = Make.builder()
                .name(processMake.getName().trim())
                .build();
        save(make);
        return make;
    }

    @Override
    public Make update(ProcessMake processMake, Long id) throws MakeNotFoundException {
        Make make = getById(id).orElseThrow(() -> new MakeNotFoundException(id));

        make.setName(processMake.getName().trim());

        save(make);
        return make;
    }

    @Override
    public void delete(Make make) {
        makeRepository.delete(make);
    }

    @Override
    public Make delete(Long id) throws MakeNotFoundException, ActionIsImpossibleException {
        Make make = getById(id).orElseThrow(() -> new MakeNotFoundException(id));

        if (modelService.existsByMake(make)) {
            throw new ActionIsImpossibleException("Невозможно удалить марку в которой существуют модели");
        }

        if (sparePartService.existsByMake(make)) {
            throw new ActionIsImpossibleException("Невозможно удалить марку которая используется в запчасти");
        }

        delete(make);
        return make;
    }

    @Override
    public Optional<Make> getById(Long id) {
        return makeRepository.findById(id);
    }

    @Override
    public List<Make> getAll() {
        return makeRepository.findAll();
    }

    @Override
    public List<Make> getAllSorted() {
        return makeRepository.findAllByOrderByName();
    }

    @Override
    public Boolean existsById(Long id) {
        return makeRepository.existsById(id);
    }
}
