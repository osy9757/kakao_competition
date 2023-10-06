package welcome.travel.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    NOT_FOUND_USER(-1000, "등록된 사용자가 없습니다.", HttpStatus.NOT_FOUND),
    INVALID_EMAIL(-1001, "해당 정보는 사용하실 수 없습니다.", HttpStatus.FORBIDDEN);

    ErrorCode(Integer code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    private final Integer code;
    private final String message;
    private final HttpStatus httpStatus;
}
