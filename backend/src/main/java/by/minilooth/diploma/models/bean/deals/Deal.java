package by.minilooth.diploma.models.bean.deals;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.users.User;
import lombok.*;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "deal")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Deal extends AbstractEntity {

    @OneToMany(mappedBy = "deal", targetEntity = Trade.class, cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private Set<Trade> trades = new LinkedHashSet<>();

    @Column(name = "total_price", nullable = false)
    private Float totalPrice;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
