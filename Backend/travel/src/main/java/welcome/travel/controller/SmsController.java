package welcome.travel.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import welcome.travel.dto.MessageDto;
import welcome.travel.dto.SmsConfirmDto;
import welcome.travel.service.SmsService;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@Tag(name = "sms", description = "문자 인증 API")
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/sms/send")
    @Operation(summary = "문자 인증", description = "전화 번호 인증 서비스")
    public SmsConfirmDto sendSms(@RequestBody MessageDto messageDto) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException, JsonProcessingException {
        return smsService.sendSms(messageDto);

    }

}
