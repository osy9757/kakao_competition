package welcome.travel.dto.request;

import lombok.Getter;
import lombok.Setter;
import welcome.travel.jwt.TokenInfo;

@Getter
@Setter
public class KakaoLoginResponseDto {
    private boolean flag;
    private TokenInfo tokenInfo;
}