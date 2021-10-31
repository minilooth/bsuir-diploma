package by.minilooth.diploma.models.bean.stores;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.stores.Store;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Address extends AbstractEntity implements Comparable<Address> {

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "house", nullable = false)
    private String house;

    @Column(name = "housing")
    private String housing;

    @Column(name = "room")
    private String room;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
    private Set<Store> stores;

    public String getFullAddress() {
        StringBuilder sb = new StringBuilder();

        sb.append(street);
        sb.append(", д. ").append(house);

        if (!Objects.isNull(housing) && !housing.isEmpty() && !housing.isBlank()) {
            sb.append(", к. ").append(housing);
        }

        if (!Objects.isNull(room) && !room.isEmpty() && !room.isBlank()) {
            sb.append(", кв. ").append(room);
        }

        return sb.toString();
    }

    @Override
    public int compareTo(Address o) {
        return getFullAddress().compareTo(o.getFullAddress());
    }
}
