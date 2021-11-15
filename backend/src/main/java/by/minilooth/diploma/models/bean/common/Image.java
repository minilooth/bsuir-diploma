package by.minilooth.diploma.models.bean.common;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.common.builders.ImageBuilder;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.users.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Image extends AbstractEntity {

    @Column(name = "filename", nullable = false, unique = true)
    private String filename;

    @OneToOne(mappedBy = "avatar", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @OneToOne(mappedBy = "image", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Store store;

    @OneToOne(mappedBy = "image", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private SparePart sparePart;

    public static ImageBuilder builder() {
        return new ImageBuilder();
    }

}
