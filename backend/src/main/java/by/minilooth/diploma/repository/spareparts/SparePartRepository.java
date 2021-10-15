package by.minilooth.diploma.repository.spareparts;

import by.minilooth.diploma.models.bean.spareparts.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart, Long> {
}
