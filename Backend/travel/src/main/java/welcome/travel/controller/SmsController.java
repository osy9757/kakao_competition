package welcome.travel.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import welcome.travel.dto.MessageDto;
import welcome.travel.dto.SmsConfirmDto;
import welcome.travel.dto.SmsRequestDto;
import welcome.travel.dto.SmsResponseDto;
import welcome.travel.service.SmsService;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/sms/send")
    public SmsConfirmDto sendSms(@RequestBody MessageDto messageDto) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException, JsonProcessingException {
        SmsConfirmDto smsConfirmNumber = smsService.sendSms(messageDto);
        return smsConfirmNumber;

    }

}
