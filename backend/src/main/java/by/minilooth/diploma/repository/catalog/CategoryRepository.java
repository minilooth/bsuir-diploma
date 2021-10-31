package by.minilooth.diploma.repository.catalog;

import by.minilooth.diploma.models.bean.catalog.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
