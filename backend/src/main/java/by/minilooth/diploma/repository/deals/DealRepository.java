package by.minilooth.diploma.repository.deals;

import by.minilooth.diploma.models.bean.deals.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
}
