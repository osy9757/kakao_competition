package welcome.travel.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    private static final String API_VERSION = "1.0.0";
    private static final String API_TITLE = "Welcome2Korea";
    private static final String API_DESCRIPTION = "어서와 한국은 처음이지 API 명세서입니다.";
    private static final String API_GROUP_NAME = "v1-api";
    private static final String API_PATHS = "/**";

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group(API_GROUP_NAME)
                .pathsToMatch(API_PATHS)
                .build();
    }

    @Bean
    public OpenAPI omokOpenAPI() {
        return new OpenAPI()
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title(API_TITLE)
                .description(API_DESCRIPTION)
                .version(API_VERSION);
    }

}
