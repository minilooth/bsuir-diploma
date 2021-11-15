package by.minilooth.diploma.service.deals.impl;

import by.minilooth.diploma.exception.deals.DealNotFoundException;
import by.minilooth.diploma.models.bean.deals.Deal;
import by.minilooth.diploma.repository.deals.DealRepository;
import by.minilooth.diploma.service.deals.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class DealServiceImpl implements DealService {

    @Autowired private DealRepository dealRepository;

    @Override
    public void save(Deal deal) {
        dealRepository.save(deal);
    }

    @Override
    public void delete(Deal deal) {
        dealRepository.delete(deal);
    }

    @Override
    public Deal getById(Long id) throws DealNotFoundException {
        return dealRepository.findById(id).orElseThrow(() -> new DealNotFoundException(id));
    }

    @Override
    public List<Deal> getAll() {
        return dealRepository.findAll();
    }
}
