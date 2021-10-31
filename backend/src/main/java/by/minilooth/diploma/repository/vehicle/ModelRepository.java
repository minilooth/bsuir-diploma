package by.minilooth.diploma.repository.vehicle;

import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    List<Model> findAllByMakeOrderByName(Make make);
    List<Model> findAllByMake(Make make);
    Boolean existsByMake(Make make);
    boolean existsById(Long id);

}
