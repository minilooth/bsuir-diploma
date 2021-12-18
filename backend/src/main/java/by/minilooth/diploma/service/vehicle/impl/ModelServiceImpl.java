package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessModel;
import by.minilooth.diploma.repository.vehicle.ModelRepository;
import by.minilooth.diploma.service.spareparts.SparePartService;
import by.minilooth.diploma.service.vehicle.GenerationService;
import by.minilooth.diploma.service.vehicle.MakeService;
import by.minilooth.diploma.service.vehicle.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ModelServiceImpl implements ModelService {

    @Autowired private ModelRepository modelRepository;
    @Autowired private MakeService makeService;
    @Autowired private GenerationService generationService;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Model model) {
        modelRepository.save(model);
    }

    @Override
    public Model save(ProcessModel processModel) {
        Model model = Model.builder()
                .name(processModel.getName().trim())
                .make(processModel.getMake())
                .build();
        save(model);
        return model;
    }

    @Override
    public Model update(ProcessModel processModel, Long id) throws ModelNotFoundException {
        Model model = getById(id);

        model.setMake(processModel.getMake());
        model.setName(processModel.getName().trim());

        save(model);
        return model;
    }

    @Override
    public void delete(Model model) {
        modelRepository.delete(model);
    }

    @Override
    public Model delete(Long id) throws ModelNotFoundException, ActionIsImpossibleException {
        Model model = getById(id);

        if (generationService.existsByModel(model)) {
            throw new ActionIsImpossibleException("Невозможно удалить модель в которой существуют поколения");
        }

        if (sparePartService.existsByModel(model)) {
            throw new ActionIsImpossibleException("Невозможно удалить модель которая используется в запчасти");
        }

        delete(model);
        return model;
    }

    @Override
    public Model getById(Long id) throws ModelNotFoundException {
        return modelRepository.findById(id).orElseThrow(() -> new ModelNotFoundException(id));
    }

    @Override
    public List<Model> getAllByMake(Long id) throws MakeNotFoundException {
        return modelRepository.findAllByMake(makeService.getById(id));
    }

    @Override
    public List<Model> getAllByMakeSorted(Long id) throws MakeNotFoundException {
        return modelRepository.findAllByMakeOrderByName(makeService.getById(id));
    }

    @Override
    public List<Model> getAll() {
        return modelRepository.findAll();
    }

    @Override
    public Boolean existsByMake(Make make) {
        return modelRepository.existsByMake(make);
    }

    @Override
    public Boolean existsById(Long id) {
        return modelRepository.existsById(id);
    }
}
