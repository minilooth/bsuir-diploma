package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.vehicle.GenerationNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.repository.vehicle.GenerationRepository;
import by.minilooth.diploma.service.vehicle.GenerationService;
import by.minilooth.diploma.service.vehicle.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class GenerationServiceImpl implements GenerationService {

    private final GenerationRepository generationRepository;
    private final ModelService modelService;

    @Override
    public void save(Generation generation) {
        generationRepository.save(generation);
    }

    @Override
    public void delete(Generation generation) {
        generationRepository.delete(generation);
    }

    @Override
    public void deleteById(Long id) throws GenerationNotFoundException {
        generationRepository.delete(getById(id));
    }

    @Override
    public Generation getById(Long id) throws GenerationNotFoundException {
        return generationRepository.findById(id).orElseThrow(() -> new GenerationNotFoundException(id));
    }

    @Override
    public List<Generation> getAllByModel(Model model) {
        return generationRepository.findAllByModel(model);
    }

    @Override
    public List<Generation> getAllByModel(Long id) throws ModelNotFoundException {
        return generationRepository.findAllByModel(modelService.getById(id));
    }

    @Override
    public List<Generation> getAll() {
        return generationRepository.findAll();
    }

}
