package by.minilooth.diploma.service.common;

import by.minilooth.diploma.models.bean.common.Config;

public interface ConfigService {

    void save(Config config);
    Boolean getBooleanValue(String key);
    Integer getIntegerValue(String key);
    String getStringValue(String key);
    Boolean existsByKey(String key);

}
