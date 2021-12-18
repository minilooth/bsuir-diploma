package by.minilooth.diploma.models.bean.common;

import lombok.*;

import javax.persistence.*;

@Data
@Table(name = "t_config")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Config {

    public final static String INITIALIZED = "initialized";

    public enum ValueType {
        STRING,
        INTEGER,
        BOOLEAN
    }

    @Id
    @Column(name = "ckey", nullable = false, unique = true)
    private String key;

    @Column(name = "cvalue", nullable = false)
    private String value;

    @Column(name = "ctype", nullable = false)
    @Enumerated(EnumType.STRING)
    private ValueType type;

}
