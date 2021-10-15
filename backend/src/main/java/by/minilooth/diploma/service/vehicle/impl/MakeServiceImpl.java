package by.minilooth.diploma.service.vehicle.impl;

import by.minilooth.diploma.exception.vehicle.MakeNotFoundException;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.repository.vehicle.MakeRepository;
import by.minilooth.diploma.service.vehicle.MakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class MakeServiceImpl implements MakeService {

    private final MakeRepository makeRepository;

    @Override
    public void save(Make make) {
        makeRepository.save(make);
    }

    @Override
    public void delete(Make make) {
        makeRepository.delete(make);
    }

    @Override
    public void deleteById(Long id) throws MakeNotFoundException {
        delete(getById(id));
    }

    @Override
    public Make getById(Long id) throws MakeNotFoundException {
        return makeRepository.findById(id).orElseThrow(() -> new MakeNotFoundException(id));
    }

    @Override
    public List<Make> getAll() {
        return makeRepository.findAll();
    }
}
