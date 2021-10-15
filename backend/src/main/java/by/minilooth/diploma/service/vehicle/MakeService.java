package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;

import java.util.List;

public interface MakeService {

    void save(Make make);
    void delete(Make make);
    void deleteById(Long id) throws MakeNotFoundException;
    Make getById(Long id) throws MakeNotFoundException;
    List<Make> getAll();

}
