package by.minilooth.diploma.models.bean.spareparts;

import by.minilooth.diploma.models.api.AbstractEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class Category extends AbstractEntity {

    @Column(name = "title", nullable = false, unique = true)
    private String title;

    @Column(name = "subtitle", nullable = false)
    private String subtitle;

    @Column(name ="name")
    private String name;

}
