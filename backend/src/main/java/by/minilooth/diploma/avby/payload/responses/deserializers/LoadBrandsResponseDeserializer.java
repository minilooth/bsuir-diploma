package by.minilooth.diploma.avby.payload.responses.deserializers;

import by.minilooth.diploma.avby.payload.responses.LoadBrandsResponse;
import by.minilooth.diploma.models.bean.vehicle.Make;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LoadBrandsResponseDeserializer extends JsonDeserializer<LoadBrandsResponse> {

    @Override
    public LoadBrandsResponse deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        List<Make> brands = new ArrayList<>();

        JsonNode node = jsonParser.readValueAsTree();
        JsonNode block = node.get("blocks").get(0);
        JsonNode row = block.get("rows").get(0);
        JsonNode propertyGroup = row.get("propertyGroups").get(0);
        JsonNode property = propertyGroup.get("properties").get(0);
        JsonNode value = property.get("value").get(0).get(0);
        JsonNode options = value.get("options");

        for (JsonNode option : options) {
            Long id = option.get("id").asLong();
            String name = option.get("label").asText();

            Make make = new Make();

            make.setName(name);
            make.setId(id);

            brands.add(make);
        }

        return new LoadBrandsResponse(brands);
    }

}
