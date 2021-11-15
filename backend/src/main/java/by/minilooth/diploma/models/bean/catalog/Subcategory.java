package by.minilooth.diploma.models.bean.catalog;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.catalog.builders.SubcategoryBuilder;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subcategory")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Subcategory extends AbstractEntity implements Comparable<Subcategory> {

    @Column(name = "name", nullable = false)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "subcategory", cascade = CascadeType.ALL)
    private Set<Group> groups = new HashSet<>();

    @Override
    public int compareTo(Subcategory o) {
        int compare = o.getName().compareTo(name);
        if (compare != 0) {
            return compare;
        }
        return o.getCategory().compareTo(category);
    }

    public static SubcategoryBuilder builder() {
        return new SubcategoryBuilder();
    }

}
