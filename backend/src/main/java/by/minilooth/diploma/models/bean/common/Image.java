package by.minilooth.diploma.models.bean.common;

import by.minilooth.diploma.models.api.AbstractEntity;
import by.minilooth.diploma.models.bean.users.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
public class Image extends AbstractEntity {

    @Column(name = "filename", nullable = false, unique = true)
    private String filename;

    @OneToOne(mappedBy = "avatar", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

}
