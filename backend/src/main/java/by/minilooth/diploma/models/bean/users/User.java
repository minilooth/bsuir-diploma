package by.minilooth.diploma.models.bean.users;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.models.bean.deals.Deal;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "user")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
public class User extends AbstractEntity implements UserDetails {

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "middlename", nullable = false)
    private String middlename;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "is_email_confirmed", nullable = false, columnDefinition = "TINYINT")
    @Builder.Default
    private Boolean isEmailConfirmed = false;

    @Column(name = "is_account_non_locked", nullable = false, columnDefinition = "TINYINT")
    @Builder.Default
    private Boolean isAccountNonLocked = true;

    @Column(name = "is_account_non_disabled", nullable = false, columnDefinition = "TINYINT")
    @Builder.Default
    private Boolean isAccountNonDisabled = true;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany
    @JoinTable(	name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> authorities = new HashSet<>();

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinTable(name = "user_image",
            joinColumns =
                    { @JoinColumn(name = "user_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "image_id", referencedColumnName = "id") })
    private Image avatar;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ConfirmationToken confirmationToken;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Deal> deals = new HashSet<>();

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinTable(name = "user_cart",
            joinColumns =
                    { @JoinColumn(name = "user_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "cart_id", referencedColumnName = "id") })
    private Cart cart;

    @Override
    public boolean isAccountNonExpired() {
        return isEmailConfirmed;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isAccountNonDisabled;
    }
}
