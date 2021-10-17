package by.minilooth.diploma.models.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UserSort {

    USERNAME("username"),
    EMAIL("email"),
    FIRSTNAME("firstname"),
    LASTNAME("lastname"),
    PHONE_NUMBER("phoneNumber"),
    CREATED_AT("createdAt");

    private final String field;

}
