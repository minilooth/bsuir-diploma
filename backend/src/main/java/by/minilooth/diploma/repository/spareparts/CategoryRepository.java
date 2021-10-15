package by.minilooth.diploma.repository.spareparts;

import by.minilooth.diploma.models.bean.spareparts.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
