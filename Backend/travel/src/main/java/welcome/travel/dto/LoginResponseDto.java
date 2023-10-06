package welcome.travel.dto;

import lombok.Data;
import welcome.travel.domain.Account;

@Data
public class LoginResponseDto {
//    public boolean flag;
//    public Account account;
    public String token;
}