package by.minilooth.diploma.avby.payload.requests;

import by.minilooth.diploma.avby.payload.requests.serializers.LoadModelsRequestSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@JsonSerialize(using = LoadModelsRequestSerializer.class)
@AllArgsConstructor
public class LoadModelsRequest {

    private Long brandId;

}
