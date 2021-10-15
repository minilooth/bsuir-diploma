package by.minilooth.diploma.models.bean.users;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "role")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
public class Role extends AbstractEntity implements GrantedAuthority {

    public final static String ADMIN = "ADMIN";
    public final static String EMPLOYEE = "EMPLOYEE";

    @Column(name = "authority", nullable = false)
    private String authority;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany
    @JoinTable( name = "user_role",
            joinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name="user_id", referencedColumnName = "id")})
    private Set<User> users = new HashSet<>();

}
