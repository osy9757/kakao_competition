package welcome.travel.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import welcome.travel.domain.Account;
import welcome.travel.domain.User;
import welcome.travel.dto.KakaoAccountDto;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.dto.request.KakaoLoginResponseDto;
import welcome.travel.dto.request.SocialLoginRequestDto;
import welcome.travel.jwt.JwtTokenProvider;
import welcome.travel.jwt.TokenInfo;
import welcome.travel.repository.UserRepository;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final Environment env;
    private static final String PASSWORD = "0000";
    private Boolean flag = false;

    @Transactional
    public ResponseEntity<User> processAfterKakao(String token, SocialLoginRequestDto socialLoginRequestDto) {
        String accessToken = token.substring("Bearer ".length());
        User user = userRepository.findByEmail(jwtTokenProvider.getEmailFromAccessToken(accessToken)).orElseThrow();

        user.updateKakao(socialLoginRequestDto.getPhoneNumber(), socialLoginRequestDto.getAgreeInfo(), socialLoginRequestDto.getAgreeMarketing());

        return ResponseEntity.ok(user);
    }


    @Transactional
    public KakaoTokenDto getKakaoAccessToken(String code) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", env.getProperty("kakao.KAKAO_CLIENT_ID")); // 카카오 Dev 앱 REST API 키
        params.add("redirect_uri", env.getProperty("kakao.KAKAO_REDIRECT_URI")); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
        params.add("client_secret", env.getProperty("kakao.KAKAO_CLIENT_SECRET")); // 카카오 Dev 카카오 로그인 Client Secret

        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                Objects.requireNonNull(env.getProperty("kakao.KAKAO_TOKEN_URI")),
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoTokenDto kakaoTokenDto = null;
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoTokenDto;
    }

    @Transactional
    public ResponseEntity<KakaoLoginResponseDto> kakaoLogin(String kakaoAccessToken) {
        Account account = getKakaoInfo(kakaoAccessToken);

        User user = User.builder()
                .email(account.getEmail())
                .nickname(account.getKakaoName())
                .password(passwordEncoder.encode(PASSWORD))
                .build();
        user.getRoles().add("KAKAO");

        User existUser = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (existUser == null) {
            flag = true;
            userRepository.save(user);
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(account.getEmail(), PASSWORD);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authToken);

        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        KakaoLoginResponseDto kakaoLoginResponseDto = new KakaoLoginResponseDto();
        kakaoLoginResponseDto.setTokenInfo(tokenInfo);
        kakaoLoginResponseDto.setFlag(flag);

        return ResponseEntity.ok(kakaoLoginResponseDto);
    }

    public Account getKakaoInfo(String kakaoAccessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                Objects.requireNonNull(env.getProperty("kakao.KAKAO_USER_INFO_URI")), // "https://kapi.kakao.com/v2/user/me"
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );

        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoAccountDto kakaoAccountDto = null;
        try {
            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        assert kakaoAccountDto != null;
        return Account.builder()
                .email(kakaoAccountDto.getKakaoAccount().getEmail())
                .kakaoName(kakaoAccountDto.getKakaoAccount().getProfile().getNickname())
                .build();

    }
}
