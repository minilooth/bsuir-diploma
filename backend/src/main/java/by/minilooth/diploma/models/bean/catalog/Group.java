package by.minilooth.diploma.models.bean.catalog;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.catalog.builders.GroupBuilder;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "tgroup")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Group extends AbstractEntity implements Comparable<Group> {

    @Column(name = "name", nullable = false)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

    @Override
    public int compareTo(Group o) {
        int compare = o.getName().compareTo(name);
        if (compare != 0) {
            return compare;
        }
        return o.getSubcategory().compareTo(subcategory);
    }

    public static GroupBuilder builder() {
        return new GroupBuilder();
    }

}
