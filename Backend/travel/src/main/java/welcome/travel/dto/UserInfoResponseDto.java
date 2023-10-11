package welcome.travel.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoResponseDto {
    private String nickname;
    private String email;
    private String phoneNumber;
}
