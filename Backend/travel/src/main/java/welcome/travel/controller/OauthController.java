package welcome.travel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import welcome.travel.dto.KakaoLoginResponseDto;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.jwt.TokenInfo;
import welcome.travel.service.AuthService;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class OauthController {
    private final AuthService authService;

    @GetMapping("/login/oauth2/callback/kakao")
    public KakaoLoginResponseDto kakaoLogin(HttpServletRequest request) {
        String code = request.getParameter("code");
        KakaoTokenDto kakaoAccessToken = authService.getKakaoAccessToken(code);
        return authService.kakaoLogin(kakaoAccessToken);
    }
}
