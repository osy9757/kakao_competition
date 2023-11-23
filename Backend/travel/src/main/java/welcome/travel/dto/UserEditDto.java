package welcome.travel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserEditDto {
    private String nickname;
    private String password;
    private String serialNumber;
}
