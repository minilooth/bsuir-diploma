package by.minilooth.diploma.models.bean.users;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@Table(name = "confirmation_token")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ConfirmationToken extends AbstractEntity {

    @Column(name = "token", nullable = false)
    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    public ConfirmationToken(User user) {
        this.user = user;
        this.token = UUID.randomUUID().toString();
    }

}
