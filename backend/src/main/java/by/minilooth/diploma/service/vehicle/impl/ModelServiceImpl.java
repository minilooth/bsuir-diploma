package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.repository.vehicle.ModelRepository;
import by.minilooth.diploma.service.vehicle.MakeService;
import by.minilooth.diploma.service.vehicle.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class ModelServiceImpl implements ModelService {

    private final ModelRepository modelRepository;
    private final MakeService makeService;

    @Override
    public void save(Model model) {
        modelRepository.save(model);
    }

    @Override
    public void delete(Model model) {
        modelRepository.delete(model);
    }

    @Override
    public void deleteById(Long id) throws ModelNotFoundException {
        delete(getById(id));
    }

    @Override
    public Model getById(Long id) throws ModelNotFoundException {
        return modelRepository.findById(id)
                .orElseThrow(() -> new ModelNotFoundException(id));
    }

    @Override
    public List<Model> getAllByMake(Long id) throws MakeNotFoundException {
        return modelRepository.findAllByMake(makeService.getById(id));
    }

    @Override
    public List<Model> getAllByMake(Make make) {
        return modelRepository.findAllByMake(make);
    }

    @Override
    public List<Model> getAll() {
        return modelRepository.findAll();
    }

}
