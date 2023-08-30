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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import welcome.travel.dto.KakaoAccountDto;
import welcome.travel.dto.KakaoTokenDto;
import welcome.travel.dto.LoginResponseDto;
import welcome.travel.domain.Account;
import welcome.travel.repository.AccountRepository;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AccountRepository accountRepository;

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

    public ResponseEntity<LoginResponseDto> kakaoLogin(KakaoTokenDto kakaoAccessTokenInfo) {
        String kakaoAccessToken = kakaoAccessTokenInfo.getAccess_token();

        // 토큰 기반으로 유저 정보 획득
        Account account = getKakaoInfo(kakaoAccessToken);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
//        loginResponseDto.setLoginSuccess(true);
        Account existMember = accountRepository.findById(account.getId()).orElse(null);

        // 유저가 존재할 경우
        if (existMember != null) {
//            loginResponseDto.setAccount(account);
            loginResponseDto.setFlag(true);
            loginResponseDto.setToken(kakaoAccessToken);
        } else {
//            loginResponseDto.setAccount(account);
            loginResponseDto.setFlag(false);
            loginResponseDto.setToken(kakaoAccessToken);
        }

        return ResponseEntity.ok().body(loginResponseDto);



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

        // 회원가입 처리하기
        Long kakaoId = kakaoAccountDto.getId();
//        Account existOwner = accountRepository.findById(kakaoId).orElse(null);

        // 처음 로그인이 아닌 경우
        return Account.builder()
                .kakaoId(kakaoAccountDto.getId())
                .email(kakaoAccountDto.getKakao_account().getEmail())
                .kakaoName(kakaoAccountDto.getKakao_account().getProfile().getNickname())
                .build();
    }
}
