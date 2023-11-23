package welcome.travel.dto.request;

import lombok.Getter;

@Getter
public class SocialLoginRequestDto {
    private Boolean agreeMarketing;
    private Boolean agreeInfo;
    private String phoneNumber;
}
