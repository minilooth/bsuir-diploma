package by.minilooth.diploma.repository.common;

import by.minilooth.diploma.models.bean.common.Config;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends JpaRepository<Config, String> {

    Config getByKey(String key);
    Boolean existsByKey(String key);
}
