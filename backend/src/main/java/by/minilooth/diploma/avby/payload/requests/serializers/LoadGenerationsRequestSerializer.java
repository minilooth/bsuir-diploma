package by.minilooth.diploma.avby.payload.requests.serializers;

import by.minilooth.diploma.avby.payload.requests.LoadGenerationsRequest;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class LoadGenerationsRequestSerializer extends JsonSerializer<LoadGenerationsRequest> {

    @Override
    public void serialize(LoadGenerationsRequest request, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName("properties");
        jsonGenerator.writeStartArray();
        jsonGenerator.writeStartObject();
        jsonGenerator.writeBooleanField("modified", true);
        jsonGenerator.writeStringField("name", "brands");
        jsonGenerator.writeNumberField("property", 5);
        jsonGenerator.writeFieldName("value");
        jsonGenerator.writeStartArray();
        jsonGenerator.writeStartArray();
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", "brand");
        jsonGenerator.writeNumberField("value", request.getBrandId());
        jsonGenerator.writeEndObject();
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", "model");
        jsonGenerator.writeNumberField("value", request.getModelId());
        jsonGenerator.writeBooleanField("modified", true);
        jsonGenerator.writeNullField("previousValue");
        jsonGenerator.writeEndObject();
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", "price_currency");
        jsonGenerator.writeNumberField("value", 2);
        jsonGenerator.writeEndObject();;
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }

}
