package by.minilooth.diploma.avby.payload.requests;

import by.minilooth.diploma.avby.payload.requests.serializers.LoadGenerationsRequestSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@JsonSerialize(using = LoadGenerationsRequestSerializer.class)
@AllArgsConstructor
public class LoadGenerationsRequest {

    private Long brandId;
    private Long modelId;

}
