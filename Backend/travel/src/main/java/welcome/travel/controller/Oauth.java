package welcome.travel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.dto.LoginResponseDto;
import welcome.travel.service.AuthService;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
public class Oauth {
    private final AuthService authService;


    @GetMapping("/login/oauth2/callback/kakao")
    public ResponseEntity<LoginResponseDto> kakaoLogin(HttpServletRequest request) {
        String code = request.getParameter("code");
        KakaoTokenDto kakaoAccessToken = authService.getKakaoAccessToken(code);
        return authService.kakaoLogin(kakaoAccessToken);
    }
}
