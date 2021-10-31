package by.minilooth.diploma.dto.stores.mapper;

import by.minilooth.diploma.config.mapper.AbstractMapper;
import by.minilooth.diploma.dto.stores.ProcessAddressDto;
import by.minilooth.diploma.models.stores.ProcessAddress;
import org.springframework.stereotype.Component;

@Component
public class ProcessAddressMapper extends AbstractMapper<ProcessAddress, ProcessAddressDto> {

    public ProcessAddressMapper() {
        super(ProcessAddress.class, ProcessAddressDto.class);
    }

}
