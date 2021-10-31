package by.minilooth.diploma.models;

import by.minilooth.diploma.models.api.BaseEntity;
import by.minilooth.diploma.models.bean.users.User;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Builder
@EqualsAndHashCode(callSuper = false)
public class UserList implements BaseEntity {

    private List<User> users;
    private Long pages;

}
