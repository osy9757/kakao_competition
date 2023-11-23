package welcome.travel.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponseDto {
    private String nickname;
    private String email;
    private String phoneNumber;
}
