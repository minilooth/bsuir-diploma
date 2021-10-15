package by.minilooth.diploma.exception.handler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorResponse {

    @Builder.Default
    private Date timestamp = new Date();
    private Integer status;
    private String error;
    private String message;
    private String path;

}
