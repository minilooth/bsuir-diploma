package by.minilooth.diploma.models.bean.stores;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.common.Image;
import by.minilooth.diploma.models.enums.StoreType;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "store")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Store extends AbstractEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private StoreType type;

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @OneToMany(mappedBy = "store")
    private Set<Availability> availabilities;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinTable(name = "store_image",
            joinColumns =
                    { @JoinColumn(name = "store_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "image_id", referencedColumnName = "id") })
    private Image image;

}
