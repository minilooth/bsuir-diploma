package by.minilooth.diploma.repository.vehicle;

import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenerationRepository extends JpaRepository<Generation, Long> {

    List<Generation> findAllByModelOrderByName(Model model);
    List<Generation> findAllByModel(Model model);
    Boolean existsByModel(Model model);
    boolean existsById(Long id);

}
