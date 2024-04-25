package hr.amarek.web_project.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class OpenApiConfiguration {

    @Bean
    public OpenAPI springOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Web project docs")
                                .description("Manage user access and data, add and manage reviews")
                                .license(
                                        new License()
                                                .name("Apache 2.0")
                                                .url("http://www.apache.org/licenses/LICENSE-2.0")));
    }


    @Bean
    public GroupedOpenApi publicApiImageFiles() {
        return GroupedOpenApi.builder()
                .group("ReviewManagement")
                .pathsToMatch("/api/review/**")
                .build();
    }

    @Bean
    public GroupedOpenApi UsersApi() {
        return GroupedOpenApi.builder()
                .group("Users")
                .pathsToMatch("/api/users/**")

                .build();
    }

    @Bean
    public GroupedOpenApi AuthApi() {
        return GroupedOpenApi.builder()
                .group("Authentication")
                .pathsToMatch("/api/token/**")

                .build();
    }

}
