package by.minilooth.diploma.dto.stores;

import by.minilooth.diploma.dto.api.BaseDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class ProcessAddressDto implements BaseDto {

    @NotNull(message = "Улица не может быть пуста")
    @NotBlank(message = "Улица не может состоять из символов пробела")
    @NotEmpty(message = "Улица должна состоять хотя бы из одного символа")
    @Pattern(regexp = "^[A-Za-zА-Яа-я .-]+$", message = "Улица указана в некорректном формате")
    private String street;

    @NotNull(message = "Номер дома не может быть пустым")
    @NotBlank(message = "Номер дома не может состоять из символов пробела")
    @NotEmpty(message = "Номер дома должен состоять хотя бы из одного символа")
    @Pattern(regexp = "^[0-9]{1,3}[A-Za-zА-Яа-я]?$", message = "Номер дома указан в некорректном формате")
    private String house;

    //    @NotBlank(message = "Корпус дома не может состоять из символов пробела")
//    @NotEmpty(message = "Корпус дома должен состоять хотя бы из одного символа")
    @Pattern(regexp = "^((?=[0-9]{1})?[0-9]{1,1}$|[A-Za-zА-Яа-я]{1})$", message = "Корпус дома указан в некорректном формате")
    private String housing;

    @NotBlank(message = "Номер квартиры не может состоять из символов пробела")
    @NotEmpty(message = "Номер квартиры должен состоять хотя бы из одного символа")
    @Pattern(regexp = "^[0-9]{1,2}[A-Za-zА-Яа-я]?$", message = "Номер квартиры указан в некорректном формате")
    private String room;

}
