package by.minilooth.diploma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class DiplomaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiplomaBackendApplication.class, args);
    }

}
