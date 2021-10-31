package by.minilooth.diploma.avby.payload.responses.deserializers;

import by.minilooth.diploma.avby.payload.responses.LoadModelsResponse;
import by.minilooth.diploma.models.bean.vehicle.Model;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LoadModelsResponseDeserializer extends JsonDeserializer<LoadModelsResponse> {

    @Override
    public LoadModelsResponse deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        List<Model> models = new ArrayList<>();

        JsonNode node = jsonParser.readValueAsTree();
        JsonNode properties = node.get("properties").get(0);
        JsonNode value = properties.get("value").get(0).get(1);
        JsonNode options = value.get("options");

        for (JsonNode option : options) {
            Long id = option.get("id").asLong();
            String name = option.get("label").asText();

            Model model = new Model();
            model.setName(name);
            model.setId(id);

            models.add(model);
        }

        return new LoadModelsResponse(models);
    }

}
