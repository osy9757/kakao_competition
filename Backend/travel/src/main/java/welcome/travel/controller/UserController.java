package welcome.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import welcome.travel.domain.User;
import welcome.travel.dto.UserInfoResponseDto;
import welcome.travel.dto.UserLoginRequestDto;
import welcome.travel.dto.UserSignUpRequestDto;
import welcome.travel.jwt.TokenInfo;
import welcome.travel.service.UserService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "users", description = "회원 API")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    /**
     * 회원 정보 조회
     */
    @Operation(summary = "이메일 조회", description = "엑세스 토큰으로 이메일 조회")
    @GetMapping
    public ResponseEntity<UserInfoResponseDto> getUserByEmail(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.getUserInfo(token));
    }

    /**
     * 회원가입
     */
    @Operation(summary = "회원 가입", description = "자체 회원 가입")
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity singUp(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append(", ");
            }
            errorMessage.delete(errorMessage.length() - 2, errorMessage.length());

            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("status", HttpStatus.BAD_REQUEST.value());
            errorMap.put("message", errorMessage.toString());

            return ResponseEntity.badRequest().body(errorMap);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
        }

        String encodedPassword = passwordEncoder.encode(userSignUpRequestDto.getPassword());

        User user = User.builder()
                .email(userSignUpRequestDto.getEmail())
                .password(encodedPassword)
                .nickname(userSignUpRequestDto.getNickname())
                .phoneNumber(userSignUpRequestDto.getPhoneNumber())
                .agree_marketing(userSignUpRequestDto.getAgree_marketing())
                .agree_info(userSignUpRequestDto.getAgree_info())
                .build();
        user.getRoles().add("USER");
        userService.join(user);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 로그인
     */
    @Operation(summary = "로그인", description = "자체 회원 로그인")
    @PostMapping("/login")
    public TokenInfo login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        TokenInfo tokenInfo = userService.login(userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());

        return tokenInfo;
    }


    /**
     * 아이디 찾기
     */
//    @Operation(summary = "find email", description = "이메일 찾기")
//    @GetMapping("/find")
//    public String FindIdBySerialNumber(@RequestParam("serialNumber") String serialNumber) {
//
//        User userBySerialNumber = userService.findUserBySerialNumber(serialNumber);
//        String email = userBySerialNumber.getEmail();
//
//        return email;
//    }

    /**
     * 비밀번호 확인
     */
//    @Operation(summary = "check password", description = "비밀번호 확인하기")
//    @PostMapping("/check")
//    public ResponseEntity<String> checkPassword(@RequestBody CheckPasswordDto checkPasswordDto) {
//        return userService.checkPassword(checkPasswordDto.getEmail(), checkPasswordDto.getPassword());
//    }

    /**
     * 회원정보 수정
     */
//    @Operation(summary = "edit user information", description = "회원 정보 수정하기")
//    @PutMapping("/edit")
//    public void editUserInfo(@RequestBody UserEditDto userEditDto) {
//        userService.edit(userEditDto);
//    }

    /**
     * 회원 탈퇴
     */
//    @Operation(summary = "delete user", description = "회원 탈퇴하기")
//    @ResponseStatus(HttpStatus.OK)
//    @DeleteMapping("/withdraw/{serialNumber}")
//    public void delete(@PathVariable("serialNumber") String serialNumber) {
//
//        userService.delete(serialNumber);
//    }
}

