package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.GenerationNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessGeneration;
import by.minilooth.diploma.repository.vehicle.GenerationRepository;
import by.minilooth.diploma.service.spareparts.SparePartService;
import by.minilooth.diploma.service.vehicle.GenerationService;
import by.minilooth.diploma.service.vehicle.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class GenerationServiceImpl implements GenerationService {

    @Autowired private GenerationRepository generationRepository;
    @Autowired private ModelService modelService;
    @Autowired private SparePartService sparePartService;

    @Override
    public void save(Generation generation) {
        generationRepository.save(generation);
    }

    @Override
    public Generation save(ProcessGeneration processGeneration) {
        Generation generation = Generation.builder()
                .name(processGeneration.getName().trim())
                .model(processGeneration.getModel())
                .build();
        save(generation);
        return generation;
    }

    @Override
    public Generation update(ProcessGeneration processGeneration, Long id) throws GenerationNotFoundException {
        Generation generation = getById(id);

        generation.setModel(processGeneration.getModel());
        generation.setName(processGeneration.getName().trim());

        save(generation);
        return generation;
    }

    @Override
    public void delete(Generation generation) {
        generationRepository.delete(generation);
    }

    @Override
    public Generation delete(Long id) throws GenerationNotFoundException, ActionIsImpossibleException {
        Generation generation = getById(id);

        if (sparePartService.existsByGeneration(generation)) {
            throw new ActionIsImpossibleException("Невозможно удалить поколение которое используется в запчасти");
        }

        delete(generation);
        return generation;
    }

    @Override
    public Generation getById(Long id) throws GenerationNotFoundException {
        return generationRepository.findById(id).orElseThrow(() -> new GenerationNotFoundException(id));
    }

    @Override
    public List<Generation> getAllByModel(Long id) throws ModelNotFoundException {
        Model model = modelService.getById(id);
        return generationRepository.findAllByModel(model);
    }

    @Override
    public List<Generation> getAll() {
        return generationRepository.findAll();
    }

    @Override
    public List<Generation> getAllByModelSorted(Long id) throws ModelNotFoundException {
        Model model = modelService.getById(id);
        return generationRepository.findAllByModelOrderByName(model);
    }

    @Override
    public Boolean existsByModel(Model model) {
        return generationRepository.existsByModel(model);
    }

    @Override
    public Boolean existsById(Long id) {
        return generationRepository.existsById(id);
    }
}
