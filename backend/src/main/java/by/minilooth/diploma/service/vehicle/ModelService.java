package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.exception.vehicle.ModelNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;

import java.util.List;

public interface ModelService {

    void save(Model model);
    void delete(Model model);
    void deleteById(Long id) throws ModelNotFoundException;
    Model getById(Long id) throws ModelNotFoundException;
    List<Model> getAllByMake(Long id) throws MakeNotFoundException;
    List<Model> getAllByMake(Make make);
    List<Model> getAll();

}
