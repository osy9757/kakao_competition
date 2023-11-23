package welcome.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import welcome.travel.domain.User;
import welcome.travel.dto.request.KakaoLoginResponseDto;
import welcome.travel.dto.request.SocialLoginRequestDto;
import welcome.travel.service.AuthService;

@RestController
@RequiredArgsConstructor
@Tag(name = "oauth", description = "소셜 로그인 API")
public class OauthController {
    private final AuthService authService;

    @GetMapping("/login/oauth2/callback/kakao")
    @Operation(summary = "카카오 로그인", description = "카카오 연동 로그인")
    public ResponseEntity<KakaoLoginResponseDto> kakaoLogin(
            @RequestParam String code) {

        return authService.kakaoLogin(authService.getKakaoAccessToken(code).getAccessToken());
    }

    @PostMapping("/login/oauth2/kakao")
    @Operation(summary = "카카오 로그인", description = "카카오 회원 문자 인증 및 동의 처리")
    public ResponseEntity<User> socialLogin(
            @RequestHeader("Authorization") String token,
            @RequestBody SocialLoginRequestDto socialLoginRequestDto) {

        return authService.processAfterKakao(token, socialLoginRequestDto);
    }
}
