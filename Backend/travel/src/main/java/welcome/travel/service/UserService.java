package welcome.travel.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import welcome.travel.domain.User;
import welcome.travel.dto.request.UserLoginRequestDto;
import welcome.travel.dto.request.UserSignUpRequestDto;
import welcome.travel.dto.response.UserInfoResponseDto;
import welcome.travel.exception.ClientException;
import welcome.travel.exception.ErrorCode;
import welcome.travel.jwt.JwtTokenProvider;
import welcome.travel.jwt.TokenInfo;
import welcome.travel.repository.UserRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<UserInfoResponseDto> getUserInfo(String token) {
        String accessToken = token.substring("Bearer ".length());
        User user = userRepository.findByEmail(jwtTokenProvider.getEmailFromAccessToken(accessToken)).orElseThrow();

        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.builder()
                .nickname(user.getNickname())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .build();

        return ResponseEntity.ok(userInfoResponseDto);
    }

    @Transactional
    public ResponseEntity<User> join(UserSignUpRequestDto userSignUpRequestDto) {
        String encodedPassword = passwordEncoder.encode(userSignUpRequestDto.getPassword());

        User user = User.builder()
                .email(userSignUpRequestDto.getEmail())
                .password(encodedPassword)
                .nickname(userSignUpRequestDto.getNickname())
                .phoneNumber(userSignUpRequestDto.getPhoneNumber())
                .agreeMarketing(userSignUpRequestDto.getAgreeMarketing())
                .agreeInfo(userSignUpRequestDto.getAgreeInfo())
                .build();

        user.getRoles().add("USER");

        verifiedExistedEmail(user.getEmail());
        verifiedExistedPhoneNumber(user.getPhoneNumber());

        return ResponseEntity.ok(userRepository.save(user));
    }

    @Transactional
    public ResponseEntity<TokenInfo> login(UserLoginRequestDto userLoginRequestDto) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userLoginRequestDto.getEmail(), userLoginRequestDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        return ResponseEntity.ok(jwtTokenProvider.generateToken(authentication));
    }

    private void verifiedExistedEmail(String email) {
        Optional<User> findUser = userRepository.findByEmail(email);
        if (findUser.isPresent()) {
            throw new ClientException(ErrorCode.INVALID_EMAIL);
        }
    }

    private void verifiedExistedPhoneNumber(String phoneNumber) {
        Optional<User> findUser = userRepository.findByPhoneNumber(phoneNumber);
        if (findUser.isPresent()) {
            throw new ClientException(ErrorCode.INVALID_EMAIL);
        }
    }

}
