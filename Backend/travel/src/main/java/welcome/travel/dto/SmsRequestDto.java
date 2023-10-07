package welcome.travel.dto;


import lombok.*;

import java.util.List;

//@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmsRequestDto {
    String type;
    String contentType;
    String countryCode;
    String from;
    String content;
    List<MessageDto> messages;
}
