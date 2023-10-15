package welcome.travel.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import welcome.travel.dto.CommentRequestDto;
import welcome.travel.service.CommentService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/comments")
@Tag(name = "comments", description = "회원 API")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "댓글 등록", description = "댓글 등록 기능")
    @PostMapping()
    public ResponseEntity<Object> register(@RequestHeader("Authorization") String token, @RequestBody CommentRequestDto commentRequestDto) {

        commentService.register(token, commentRequestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

//    @Operation(summary = "댓글 조회", description = "댓글 조회 기능")
//    @PostMapping("/{place}")
//    public ResponseEntity<Object> search(@PathVariable("place") String place) {
//
//        return ResponseEntity.
//                ok(commentService.getCommentInfo(place));
//    }

}
