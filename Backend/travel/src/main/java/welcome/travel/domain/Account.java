package welcome.travel.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Account {
    @Id
    private Long id;
    private Long kakaoId;
    private String email;
    private String kakaoName;
    // 기타 필드 및 메서드가 필요한 경우 추가
}
