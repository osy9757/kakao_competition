package welcome.travel.service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import welcome.travel.domain.User;
import welcome.travel.dto.UserInfoResponseDto;
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

    public UserInfoResponseDto getUserInfo(String token) {
        String accessToken = token.substring("Bearer ".length());
        User user = userRepository.findByEmail(jwtTokenProvider.getEmailFromAccessToken(accessToken)).orElseThrow();
        return UserInfoResponseDto.builder()
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

//    public User findUser(String email) {
//        return userRepository.findByEmail(email).get();
//    }

//    @Transactional
//    public MailDto createMailAndChangePassword(String memberEmail) {
//        String str = getTempPassword();
//        MailDto m = new MailDto();
//        m.setAddress(memberEmail);
//        m.setTitle("S.with 임시비밀번호 안내 이메일 입니다.");
//        m.setMessage("안녕하세요. S.with 임시비밀번호 안내 관련 이메일 입니다."+" 회원님의 임시 비밀번호는 "+str+" 입니다. 로그인 후에 비밀번호를 변경해주세요.");
//        updatePassword(str,memberEmail);
//        return m;
//    }

    public void updatePassword(String str, String userEmail){
        String memberPassword = str;
        User user = userRepository.findByEmail(userEmail).get();
        user.updatePassword(passwordEncoder,memberPassword);
    }

    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

//    public void mailSend(MailDto mailDTO) {
//        System.out.println("전송 완료!");
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(mailDTO.getAddress());
//        message.setSubject(mailDTO.getTitle());
//        message.setText(mailDTO.getMessage());
//        message.setFrom(userEmail);
//        mailSender.send(message);
//    }

    @Transactional
    public User join(User user) {
        verifiedExistedEmail(user.getEmail());
        verifiedExistedPhoneNumber(user.getPhoneNumber());
        return userRepository.save(user);
    }

    @Transactional
    public TokenInfo login(String email, String password) {

        // Spring Security는 사용자 검증을 위해
        // encoding된 password와 그렇지 않은 password를 비교

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return tokenInfo;
    }

//    @Transactional
//    public ResponseEntity<String> checkPassword(String email, String password) {
//        Optional<User> user = userRepository.findByEmail(email);
//        if (user.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        User member = user.get();
//        if (!passwordEncoder.matches(password, member.getPassword())) {
//            return ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok("비밀번호가 확인되었습니다.");
//    }

//    @Transactional
//    public ResponseEntity<String> edit(UserEditDto userEditDto) {
//        Optional<User> optionalUser = userRepository.findById(userEditDto.getSerialNumber());
//        if (optionalUser.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        User user = optionalUser.get();
//
//        userEditDto.getNickname().ifPresent(user::updateNickname);
//        if (userEditDto.getPassword().isPresent()) {
//            String password = userEditDto.getPassword().get();
//            user.updatePassword(passwordEncoder, password);
//        }
//
//        userRepository.save(user);
//        return ResponseEntity.ok("회원 정보가 수정되었습니다");
//    }

//    @Transactional
//    public void delete(String serialNumber) {
//
//        User user = userRepository.findBySerialNumber(serialNumber).orElseThrow(() ->
//                new UserException(ExceptionCode.USER_NOT_FOUND));
//
//        List<Post> posts = postService.getPostsByUserId(user.getId());
//        for (Post post : posts) {
//            postService.delete(post.getId());
//        }
//
//        userRepository.delete(user);
//    }

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

//    private void verifiedExistedNickname(String nickname) {
//        Optional<User> findUser = userRepository.findByNickname(nickname);
//        if (findUser.isPresent()) {
//            throw new UserException(ExceptionCode.USER_NICKNAME_EXISTS);
//        }
//    }
}
