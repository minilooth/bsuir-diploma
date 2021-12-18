package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.GenerationNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessGeneration;

import java.util.List;
import java.util.Optional;

public interface GenerationService {

    void save(Generation generation);
    Generation save(ProcessGeneration processGeneration);
    Generation update(ProcessGeneration processGeneration, Long id) throws GenerationNotFoundException;
    void delete(Generation generation);
    Generation delete(Long id) throws GenerationNotFoundException, ActionIsImpossibleException;
    Generation getById(Long id) throws GenerationNotFoundException;
    List<Generation> getAllByModelSorted(Long id) throws ModelNotFoundException;
    List<Generation> getAllByModel(Long id) throws ModelNotFoundException;
    List<Generation> getAll();
    Boolean existsByModel(Model model);
    Boolean existsById(Long id);

}
