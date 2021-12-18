package by.minilooth.diploma.nbrb.beans;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class NbRbCurrency {

    @JsonProperty("Cur_ID")
    private Integer id;

    @JsonProperty("Date")
    private Date date;

    @JsonProperty("Cur_Abbreviation")
    private String abbreviation;

    @JsonProperty("Cur_Scale")
    private Float scale;

    @JsonProperty("Cur_Name")
    private String name;

    @JsonProperty("Cur_OfficialRate")
    private Float officialRate;

}
