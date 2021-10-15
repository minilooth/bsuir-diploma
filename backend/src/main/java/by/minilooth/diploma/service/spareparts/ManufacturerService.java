package by.minilooth.diploma.service.spareparts;

import by.minilooth.diploma.exception.spareparts.ManufacturerNotFoundException;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;

import java.util.List;
import java.util.Optional;

public interface ManufacturerService {

    void save(Manufacturer manufacturer);
    void delete(Manufacturer manufacturer);
    void deleteById(Long id) throws ManufacturerNotFoundException;
    Manufacturer getById(Long id) throws ManufacturerNotFoundException;
    List<Manufacturer> getAll();
    List<Manufacturer> getAll(Optional<String> name);

}
