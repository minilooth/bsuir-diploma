package by.minilooth.diploma.avby.payload.responses;

import by.minilooth.diploma.avby.payload.responses.deserializers.LoadGenerationsResponseDeserializer;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@JsonDeserialize(using = LoadGenerationsResponseDeserializer.class)
@AllArgsConstructor
public class LoadGenerationsResponse {

    private List<Generation> generations;

}
