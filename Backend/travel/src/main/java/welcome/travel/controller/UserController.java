package welcome.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import welcome.travel.domain.User;
import welcome.travel.dto.request.UserLoginRequestDto;
import welcome.travel.dto.request.UserSignUpRequestDto;
import welcome.travel.dto.response.UserInfoResponseDto;
import welcome.travel.jwt.TokenInfo;
import welcome.travel.service.UserService;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "users", description = "회원 API")
public class UserController {
    private final UserService userService;

    /**
     * 회원 정보 조회
     */
    @Operation(summary = "이메일 조회", description = "엑세스 토큰 이메일 조회")
    @GetMapping
    public ResponseEntity<UserInfoResponseDto> getUserByEmail(@RequestHeader("Authorization") String token) {
        return userService.getUserInfo(token);
    }

    /**
     * 회원 가입
     */
    @Operation(summary = "회원 가입", description = "자체 회원 가입")
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> singUp(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto) {
        return userService.join(userSignUpRequestDto);
    }

    /**
     * 로그인
     */
    @Operation(summary = "로그인", description = "자체 회원 로그인")
    @PostMapping("/login")
    public ResponseEntity<TokenInfo> login(@RequestBody UserLoginRequestDto userLoginRequestDto) {

        return userService.login(userLoginRequestDto);
    }

}

