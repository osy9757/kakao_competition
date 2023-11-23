package welcome.travel.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpRequestDto {

    @Email
    private String email;

    @NotBlank(message = "닉네임 입력 필수")
    @Size(min = 2, message = "너무 짧은 닉네임")
    private String nickname;

    @NotBlank(message = "비밀 번호 입력 필수")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}$",
            message = "8~30 자리 이상, 1개 이상의 알파벳, 숫자, 특수 문자 포함")
    private String password;

    private String phoneNumber;

    private Boolean agreeMarketing;
    private Boolean agreeInfo;

}
