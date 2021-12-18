package by.minilooth.diploma.service.common.impl;

import by.minilooth.diploma.models.bean.common.Config;
import by.minilooth.diploma.repository.common.ConfigRepository;
import by.minilooth.diploma.service.common.ConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Objects;

@Service
@Transactional
public class ConfigServiceImpl implements ConfigService {

    private final static Logger LOGGER = LoggerFactory.getLogger(ConfigService.class);

    @Autowired private ConfigRepository configRepository;

    @Override
    public void save(Config config) {
        configRepository.save(config);
    }

    @PostConstruct
    private void setupDatabase() {

    }

    @Override
    public Boolean getBooleanValue(String key) {
        Config config = getByKey(key);
        if (Objects.nonNull(config) && config.getType().equals(Config.ValueType.BOOLEAN)) {
            return Boolean.parseBoolean(config.getValue());
        }
        return null;
    }

    @Override
    public Integer getIntegerValue(String key) {
        Config config = getByKey(key);
        if (Objects.nonNull(config) && config.getType().equals(Config.ValueType.INTEGER)) {
            return Integer.parseInt(config.getValue());
        }
        return null;
    }

    @Override
    public String getStringValue(String key) {
        Config config = getByKey(key);
        if (Objects.nonNull(config) && config.getType().equals(Config.ValueType.STRING)) {
            return config.getValue();
        }
        return null;
    }

    @Override
    public Boolean existsByKey(String key) {
        return configRepository.existsByKey(key);
    }

    private Config getByKey(String key) {
        return configRepository.getByKey(key);
    }
}
