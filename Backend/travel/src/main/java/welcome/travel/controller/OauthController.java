package welcome.travel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import welcome.travel.dto.KakaoLoginResponseDto;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.dto.SocialLoginRequestDto;
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

    @PostMapping("/login/aouth2/kakao")
    public ResponseEntity<?> socialLogin(@RequestHeader("Authorization") String token, @RequestBody SocialLoginRequestDto socialLoginRequestDto) {
        authService.processAfterKakao(token, socialLoginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
