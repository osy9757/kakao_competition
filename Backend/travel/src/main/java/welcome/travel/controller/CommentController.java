package welcome.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import welcome.travel.domain.Comment;
import welcome.travel.dto.request.CommentRequestDto;
import welcome.travel.service.CommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
@Tag(name = "comments", description = "회원 API")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "댓글 등록", description = "댓글 등록 기능")
    @PostMapping()
    public ResponseEntity<Comment> register(
            @RequestHeader("Authorization") String token,
            @RequestBody CommentRequestDto commentRequestDto) {

        return commentService.saveComment(token, commentRequestDto);
    }

}
