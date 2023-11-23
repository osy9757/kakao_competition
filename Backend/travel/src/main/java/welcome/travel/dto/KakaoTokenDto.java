package welcome.travel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KakaoTokenDto {
    private String accessToken;
    private String tokenType;
    private String refreshToken;
    private String idToken;
    private int accessTokenExpires;
    private int refreshTokenExpires;
    private String scope;
}