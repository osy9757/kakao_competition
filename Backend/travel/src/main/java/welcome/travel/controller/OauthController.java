package welcome.travel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.dto.LoginResponseDto;
import welcome.travel.service.AuthService;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/login/oauth2")
public class OauthController {
    private final AuthService authService;

    @GetMapping("/callback/kakao")
    public ResponseEntity<LoginResponseDto> kakaoLogin(HttpServletRequest request) {
        String code = request.getParameter("code");
        KakaoTokenDto kakaoAccessToken = authService.getKakaoAccessToken(code);
        return authService.kakaoLogin(kakaoAccessToken);
    }
}
