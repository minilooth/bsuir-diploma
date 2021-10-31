package by.minilooth.diploma.avby.service;

import by.minilooth.diploma.avby.payload.requests.LoadGenerationsRequest;
import by.minilooth.diploma.avby.payload.requests.LoadModelsRequest;
import by.minilooth.diploma.avby.payload.responses.LoadBrandsResponse;
import by.minilooth.diploma.avby.payload.responses.LoadGenerationsResponse;
import by.minilooth.diploma.avby.payload.responses.LoadModelsResponse;
import by.minilooth.diploma.avby.proxy.AvByProxy;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.service.vehicle.GenerationService;
import by.minilooth.diploma.service.vehicle.MakeService;
import by.minilooth.diploma.service.vehicle.ModelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class AvByService {

    private final static Logger LOGGER = LoggerFactory.getLogger(AvByService.class);

    @Autowired private AvByProxy proxy;
    @Autowired private MakeService makeService;
    @Autowired private ModelService modelService;
    @Autowired private GenerationService generationService;

//    @PostConstruct
    private void loadVehicles() {
        LOGGER.info("Initializing vehicles...");

        LoadBrandsResponse response = proxy.getBrands();

        List<Make> brands = response.getBrands();

        for (Make brand : brands) {
            if (!makeService.existsById(brand.getId())) {
                makeService.save(brand);
            }

            LoadModelsRequest request = new LoadModelsRequest(brand.getId());
            LoadModelsResponse loadModelsResponse = proxy.getModels(request);

            List<Model> models = loadModelsResponse.getModels();

            for (Model model : models) {
                model.setMake(brand);

                if (!modelService.existsById(model.getId())) {
                    modelService.save(model);
                }

                LoadGenerationsRequest loadGenerationsRequest = new LoadGenerationsRequest(brand.getId(), model.getId());
                LoadGenerationsResponse loadGenerationsResponse = proxy.getGenerations(loadGenerationsRequest);

                List<Generation> generations = loadGenerationsResponse.getGenerations();

                for (Generation generation : generations) {
                    generation.setModel(model);

                    if (!generationService.existsById(generation.getId())) {
                        generationService.save(generation);
                    }
                }
            }
        }

        LOGGER.info("PARSED!");
    }

}
