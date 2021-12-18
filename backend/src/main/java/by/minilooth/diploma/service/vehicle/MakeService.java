package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.spareparts.vehicle.ProcessMake;

import java.util.List;
import java.util.Optional;

public interface MakeService {

    void save(Make make);
    Make save(ProcessMake processMake);
    Make update(ProcessMake processMake, Long id) throws MakeNotFoundException;
    void delete(Make make);
    Make delete(Long id) throws MakeNotFoundException, ActionIsImpossibleException;
    Make getById(Long id) throws MakeNotFoundException;
    List<Make> getAllSorted();
    List<Make> getAll();
    Boolean existsById(Long id);

}
