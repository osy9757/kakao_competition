package welcome.travel.dto;

import lombok.Data;
import welcome.travel.jwt.TokenInfo;

@Data
public class KakaoLoginResponseDto {
    public boolean flag;
    public TokenInfo tokenInfo;
}