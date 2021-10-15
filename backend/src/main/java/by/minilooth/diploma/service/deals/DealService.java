package by.minilooth.diploma.service.deals;

import by.minilooth.diploma.exception.deals.DealNotFoundException;
import by.minilooth.diploma.models.bean.deals.Deal;

import java.util.List;

public interface DealService {

    void save(Deal deal);
    void delete(Deal deal);
    Deal getById(Long id) throws DealNotFoundException;
    List<Deal> getAll();

}
