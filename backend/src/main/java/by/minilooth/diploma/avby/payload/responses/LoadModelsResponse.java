package by.minilooth.diploma.avby.payload.responses;

import by.minilooth.diploma.avby.payload.responses.deserializers.LoadModelsResponseDeserializer;
import by.minilooth.diploma.models.bean.vehicle.Model;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@JsonDeserialize(using = LoadModelsResponseDeserializer.class)
@AllArgsConstructor
public class LoadModelsResponse {

    private List<Model> models;

}
