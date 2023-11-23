package welcome.travel.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import welcome.travel.dto.MessageDto;
import welcome.travel.dto.SmsConfirmDto;
import welcome.travel.dto.request.SmsRequestDto;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class SmsService {
    private final String smsConfirmNum = createSmsKey();
    private static final Random random = new Random();

    @Value("${naver-cloud-sms.accessKey}")
    private String accessKey;
    @Value("${naver-cloud-sms.secretKey}")
    private String secretKey;
    @Value("${naver-cloud-sms.serviceId}")
    private String serviceId;
    @Value("${naver-cloud-sms.senderPhone}")
    private String phone;

    public SmsConfirmDto sendSms(MessageDto messageDto) throws NoSuchAlgorithmException, InvalidKeyException {

        //현재 시간
        String time = Long.toString(System.currentTimeMillis());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time);
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", getSignature(time)); // signature 서명

        List<MessageDto> messages = new ArrayList<>();
        messages.add(messageDto);

        SmsRequestDto smsRequestDto = SmsRequestDto.builder()
                .type("SMS")
                .contentType("COMM")
                .countryCode("82")
                .from(phone)
                .content("인증 번호 [" +smsConfirmNum+ "]를 입력해 주세요." )
                .messages(messages)
                .build();

        log.info(smsRequestDto.getMessages().get(0).getTo());
        log.info(smsRequestDto.getContent());

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());


        return SmsConfirmDto.builder()
                .confirmNumber(smsConfirmNum)
                .build();
    }

    public String createSmsKey() {
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 5; i++) {
            key.append(random.nextInt(10));
        }
        return key.toString();
    }
    // 전달 데이터 암호화
    public String getSignature(String time) throws NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/"+ this.serviceId+"/messages";

        String message = method + space + url + newLine + time + newLine + accessKey;

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        return Base64.encodeBase64String(rawHmac);
    }

}
