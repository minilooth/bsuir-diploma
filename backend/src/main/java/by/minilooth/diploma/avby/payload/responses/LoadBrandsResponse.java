package by.minilooth.diploma.avby.payload.responses;

import by.minilooth.diploma.avby.payload.responses.deserializers.LoadBrandsResponseDeserializer;
import by.minilooth.diploma.models.bean.vehicle.Make;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@JsonDeserialize(using = LoadBrandsResponseDeserializer.class)
@AllArgsConstructor
public class LoadBrandsResponse {

    private List<Make> brands;

}
