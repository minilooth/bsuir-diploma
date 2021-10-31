package by.minilooth.diploma.avby.proxy;

import by.minilooth.diploma.avby.payload.requests.LoadGenerationsRequest;
import by.minilooth.diploma.avby.payload.requests.LoadModelsRequest;
import by.minilooth.diploma.avby.payload.responses.LoadBrandsResponse;
import by.minilooth.diploma.avby.payload.responses.LoadGenerationsResponse;
import by.minilooth.diploma.avby.payload.responses.LoadModelsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Component
@FeignClient(name = "AV-BY-PROXY", url = "https://api.av.by/offer-types/cars/filters/main")
public interface AvByProxy {

    @GetMapping("/init")
    LoadBrandsResponse getBrands();

    @PostMapping("/update")
    LoadModelsResponse getModels(@RequestBody LoadModelsRequest request);

    @PostMapping("/update")
    LoadGenerationsResponse getGenerations(@RequestBody LoadGenerationsRequest request);

}
