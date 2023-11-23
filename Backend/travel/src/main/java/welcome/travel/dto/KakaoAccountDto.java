package welcome.travel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
public class KakaoAccountDto {
    private Long id;
    private LocalDateTime connectedAt;
    private Properties properties;
    private KakaoAccount kakaoAccount;

    @Getter
    @AllArgsConstructor
    public static class Properties {
        private String nickname;
        private String profileImage;
        private String thumbnailImage;
    }

    @Getter
    @AllArgsConstructor
    public static class KakaoAccount {
        private Boolean profileNicknameNeedsAgreement;
        private Boolean profileImageNeedsAgreement;
        private Profile profile;
        private Boolean hasEmail;
        private Boolean emailNeedsAgreement;
        private Boolean isEmailValid;
        private Boolean isEmailVerified;
        private String email;

        @Getter
        @AllArgsConstructor
        public static class Profile {
            private String nickname;
            private String thumbnailImageUrl;
            private String profileImageUrl;
            private Boolean isDefaultImage;
        }
    }

}