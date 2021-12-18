package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessModel;

import java.util.List;
import java.util.Optional;

public interface ModelService {

    void save(Model model);
    Model save(ProcessModel processModel);
    Model update(ProcessModel processModel, Long id) throws ModelNotFoundException;
    void delete(Model model);
    Model delete(Long id) throws ModelNotFoundException, ActionIsImpossibleException;
    Model getById(Long id) throws ModelNotFoundException;
    List<Model> getAllByMakeSorted(Long id) throws MakeNotFoundException;
    List<Model> getAllByMake(Long id) throws MakeNotFoundException;
    List<Model> getAll();
    Boolean existsByMake(Make make);
    Boolean existsById(Long id);

}
