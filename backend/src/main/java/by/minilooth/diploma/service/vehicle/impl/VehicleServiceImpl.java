package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.vehicle.VehicleNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Vehicle;
import by.minilooth.diploma.repository.vehicle.VehicleRepository;
import by.minilooth.diploma.service.vehicle.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    @Override
    public void save(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
    }

    @Override
    public void delete(Vehicle vehicle) {
        vehicleRepository.delete(vehicle);
    }

    @Override
    public Vehicle getById(Long id) throws VehicleNotFoundException {
        return vehicleRepository.findById(id).orElseThrow(() -> new VehicleNotFoundException(id));
    }

    @Override
    public List<Vehicle> getAll() {
        return vehicleRepository.findAll();
    }
}
