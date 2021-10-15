package by.minilooth.diploma.repository.common;

import by.minilooth.diploma.models.bean.common.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByFilename(String filename);

}
