package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.vehicle.GenerationNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Model;

import java.util.List;

public interface GenerationService {

    void save(Generation generation);
    void delete(Generation generation);
    void deleteById(Long id) throws GenerationNotFoundException;
    Generation getById(Long id) throws GenerationNotFoundException;
    List<Generation> getAllByModel(Model model);
    List<Generation> getAllByModel(Long id) throws ModelNotFoundException;
    List<Generation> getAll();

}
