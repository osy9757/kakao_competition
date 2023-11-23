package welcome.travel.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SmsResponseDto {
    String requestId;
    LocalDateTime requestTime;
    String statusCode;
    String statusName;
}
