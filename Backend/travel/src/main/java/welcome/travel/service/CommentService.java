package welcome.travel.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import welcome.travel.domain.Comment;
import welcome.travel.domain.User;
import welcome.travel.dto.CommentRequestDto;
import welcome.travel.jwt.JwtTokenProvider;
import welcome.travel.repository.CommentRepository;
import welcome.travel.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 댓글 등록
     * @param token
     * @param commentRequestDto
     */
    @Transactional
    public void register(String token, CommentRequestDto commentRequestDto) {
        // token으로 사용자 id값 찾기
        String accessToken = token.substring("Bearer ".length());
        User user = userRepository.findByEmail(jwtTokenProvider.getEmailFromAccessToken(accessToken)).orElseThrow();

        Long userId = user.getId();
        String content = commentRequestDto.getContent();
        String place = commentRequestDto.getPlace();

        // 댓글 정보 넣기(댓글 내용, 관광지 이름, 사용자 id)
        Comment comment = Comment.builder()
                .content(content)
                .place(place)
                .userId(userId)
                .build();

        commentRepository.save(comment);
    }
}
