package by.minilooth.diploma.avby.payload.responses.deserializers;

import by.minilooth.diploma.avby.payload.responses.LoadGenerationsResponse;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LoadGenerationsResponseDeserializer extends JsonDeserializer<LoadGenerationsResponse> {

    @Override
    public LoadGenerationsResponse deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        List<Generation> generations = new ArrayList<>();

        JsonNode node = jsonParser.readValueAsTree();
        JsonNode properties = node.get("properties").get(0);
        JsonNode value = properties.get("value").get(0).get(2);
        JsonNode options = value.get("options");

        for (JsonNode option : options) {
            Long id = option.get("id").asLong();
            String name = option.get("label").asText();

            Generation generation = new Generation();

            generation.setName(name);
            generation.setId(id);

            generations.add(generation);
        }

        return new LoadGenerationsResponse(generations);
    }

}
