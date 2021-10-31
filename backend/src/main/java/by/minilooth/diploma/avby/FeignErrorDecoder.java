package by.minilooth.diploma.avby;

import feign.Response;
import feign.codec.ErrorDecoder;

public class FeignErrorDecoder implements ErrorDecoder {

    private final ErrorDecoder defaultErrorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() >= 400 && response.status() <= 500) {
            return new Exception(response.status() + " Exception! " + response.request() + " " + response.reason());
        }
        return defaultErrorDecoder.decode(methodKey, response);
    }

}
