package welcome.travel.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class SocialLoginRequestDto {
    private Boolean agree_marketing;
    private Boolean agree_info;
    private String phoneNumber;
}
