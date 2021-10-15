package by.minilooth.diploma.repository.spareparts;

import by.minilooth.diploma.models.bean.spareparts.Modification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModificationRepository extends JpaRepository<Modification, Long> {
}
