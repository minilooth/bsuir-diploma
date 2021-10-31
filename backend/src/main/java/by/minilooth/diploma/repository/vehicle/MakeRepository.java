package by.minilooth.diploma.repository.vehicle;

import by.minilooth.diploma.models.bean.vehicle.Make;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MakeRepository extends JpaRepository<Make, Long> {

    List<Make> findAllByOrderByName();
    boolean existsById(Long id);

}
