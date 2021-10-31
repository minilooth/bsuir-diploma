package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.spareparts.ManufacturerNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.spareparts.manufacturer.ProcessManufacturer;

import java.util.List;
import java.util.Optional;

public interface ManufacturerService {

    void save(Manufacturer manufacturer);
    Manufacturer save(ProcessManufacturer processManufacturer);
    Manufacturer update(ProcessManufacturer processManufacturer, Long id) throws ManufacturerNotFoundException;
    void delete(Manufacturer manufacturer);
    Manufacturer delete(Long id) throws ManufacturerNotFoundException, ActionIsImpossibleException;
    Optional<Manufacturer> getById(Long id) throws ManufacturerNotFoundException;
    List<Manufacturer> getAll();
    List<Manufacturer> getAll(Optional<String> name);

}
