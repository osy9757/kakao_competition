package welcome.travel.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import welcome.travel.domain.Comment;
import welcome.travel.domain.User;
import welcome.travel.dto.request.CommentRequestDto;
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
     */
    @Transactional
    public ResponseEntity<Comment> saveComment(String token, CommentRequestDto commentRequestDto) {

        String accessToken = token.substring("Bearer ".length());
        User user = userRepository.findByEmail(jwtTokenProvider.getEmailFromAccessToken(accessToken)).orElseThrow();

        Long userId = user.getId();
        String content = commentRequestDto.getContent();
        String place = commentRequestDto.getPlace();

        Comment comment = Comment.builder()
                .content(content)
                .place(place)
                .userId(userId)
                .build();

        commentRepository.save(comment);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(comment);
    }
}
