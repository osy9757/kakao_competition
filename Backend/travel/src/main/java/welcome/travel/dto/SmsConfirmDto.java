package welcome.travel.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmsConfirmDto {
    String confirmNumber;
}
