package by.minilooth.diploma.service.vehicle;

import by.minilooth.diploma.exception.vehicle.VehicleNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Vehicle;

import java.util.List;

public interface VehicleService {

    void save(Vehicle vehicle);
    void delete(Vehicle vehicle);
    Vehicle getById(Long id) throws VehicleNotFoundException;
    List<Vehicle> getAll();

}
