package welcome.travel.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    NOT_FOUND_USER(-1000, "NOT FOUND USER", HttpStatus.NOT_FOUND),
    INVALID_EMAIL(-1001, "FORBIDDEN", HttpStatus.FORBIDDEN),
    NO_COMMENTS(-1002, "NOT FOUND COMMENT", HttpStatus.NOT_FOUND),
    INVALID_TOKEN(-1003, "INVALID TOKEN", HttpStatus.FORBIDDEN);

    ErrorCode(Integer code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    private final Integer code;
    private final String message;
    private final HttpStatus httpStatus;
}
