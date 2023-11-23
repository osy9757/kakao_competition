package welcome.travel.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ErrorResponse {

    private Integer code;
    private String message;
    private HttpStatus httpStatus;

    public ErrorResponse(ErrorCode e) {
        this.code = e.getCode();
        this.message = e.getMessage();
        this.httpStatus = e.getHttpStatus();
    }
}