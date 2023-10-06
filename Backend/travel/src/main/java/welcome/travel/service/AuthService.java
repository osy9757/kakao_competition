package welcome.travel.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import welcome.travel.domain.User;
import welcome.travel.dto.KakaoAccountDto;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.dto.LoginResponseDto;
import welcome.travel.domain.Account;
import welcome.travel.jwt.JwtTokenProvider;
import welcome.travel.jwt.TokenInfo;
import welcome.travel.repository.AccountRepository;
import welcome.travel.repository.UserRepository;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private static final String defaultpassword = "0000";


    @Value("${kakao.KAKAO_CLIENT_ID}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.KAKAO_CLIENT_SECRET}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${kakao.KAKAO_REDIRECT_URI}")
    private String KAKAO_REDIRECT_URI;

    @Value("${kakao.KAKAO_TOKEN_URI}")
    private String KAKAO_TOKEN_URI;

    @Value("${kakao.KAKAO_USER_INFO_URI}")
    private String KAKAO_USER_INFO_URI;


    @Transactional
    public KakaoTokenDto getKakaoAccessToken(String code) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", KAKAO_CLIENT_ID); // 카카오 Dev 앱 REST API 키
        params.add("redirect_uri", KAKAO_REDIRECT_URI); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
        params.add("client_secret", KAKAO_CLIENT_SECRET); // 카카오 Dev 카카오 로그인 Client Secret

        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                KAKAO_TOKEN_URI, // "https://kauth.kakao.com/oauth/token"
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
    public TokenInfo kakaoLogin(KakaoTokenDto kakaoAccessTokenInfo) {
        String kakaoAccessToken = kakaoAccessTokenInfo.getAccess_token();

        // 토큰 기반으로 유저 정보 획득
        Account account = getKakaoInfo(kakaoAccessToken);
        String kakaoEmail = account.getEmail();
        String kakaoNickName = account.getKakaoName();
        User user = User.builder()
                .email(kakaoEmail)
                .nickname(kakaoNickName)
                .password(defaultpassword)
                .build();
        user.getRoles().add("KAKAO");

        // 회원가입인 경우 DB에 저장
        User existUser = userRepository.findByEmail(user.getEmail()).orElse(null);

//        LoginResponseDto loginResponseDto = new LoginResponseDto();
//        loginResponseDto.setLoginSuccess(true);

        // 유저가 존재하지 않을 경우 회원가입
        if (existUser == null) {
            userRepository.save(user);
        }

        // 유저 정보 바탕으로 자체토큰 생성
        // 위에 String kakaoEmail


        // Spring Security는 사용자 검증을 위해
        // encoding된 password와 그렇지 않은 password를 비교

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(kakaoEmail, defaultpassword);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

//        return ResponseEntity.ok().body(null);
        return tokenInfo;





//        Account existOwner = accountRepository.findById(account.getId()).orElse(null);
//        try {
//            if (existOwner == null) {
//                System.out.println("처음 로그인 하는 회원입니다.");
//                accountRepository.save(account);
//            }
//            loginResponseDto.setLoginSuccess(true);
//
//            return ResponseEntity.ok().body(loginResponseDto);
//
//        } catch (Exception e) {
//            loginResponseDto.setLoginSuccess(false);
//            return ResponseEntity.badRequest().body(loginResponseDto);
//        }
    }

    public Account getKakaoInfo(String kakaoAccessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                KAKAO_USER_INFO_URI, // "https://kapi.kakao.com/v2/user/me"
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

        return Account.builder()
                .email(kakaoAccountDto.getKakao_account().getEmail())
                .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
                .build();

//        // 회원가입 처리하기
//        Long kakaoId = kakaoAccountDto.getId();
////        Account existOwner = accountRepository.findById(kakaoId).orElse(null);
//
//        // 처음 로그인이 아닌 경우
//        return Account.builder()
//                .kakaoId(kakaoAccountDto.getId())
//                .email(kakaoAccountDto.getKakao_account().getEmail())
//                .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
//                .build();
    }
}
