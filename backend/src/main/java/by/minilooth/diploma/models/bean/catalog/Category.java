package by.minilooth.diploma.models.bean.catalog;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.catalog.builders.CategoryBuilder;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Category extends AbstractEntity implements Comparable<Category> {

    @Column(name ="name", nullable = false, unique = true)
    private String name;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Subcategory> subcategories = new HashSet<>();

    @Override
    public int compareTo(Category o) {
        return o.getName().compareTo(name);
    }

    public static CategoryBuilder builder() {
        return new CategoryBuilder();
    }

}
