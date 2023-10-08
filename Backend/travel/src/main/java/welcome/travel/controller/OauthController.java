package welcome.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "oauth", description = "소셜로그인 API")
public class OauthController {
    private final AuthService authService;

    @GetMapping("/login/oauth2/callback/kakao")
    @Operation(summary = "카카오 로그인", description = "카카오 연동 로그인")
    public KakaoLoginResponseDto kakaoLogin(@RequestParam String code) {
        KakaoTokenDto kakaoAccessToken = authService.getKakaoAccessToken(code);
        return authService.kakaoLogin(kakaoAccessToken);
    }

    @PostMapping("/login/oauth2/kakao")
    @Operation(summary = "카카오 로그인", description = "카카오 회원 문자 인증 및 동의 처리")
    public ResponseEntity<?> socialLogin(@RequestHeader("Authorization") String token, @RequestBody SocialLoginRequestDto socialLoginRequestDto) {
        authService.processAfterKakao(token, socialLoginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
