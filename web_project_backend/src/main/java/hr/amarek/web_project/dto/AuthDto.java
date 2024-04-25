package hr.amarek.web_project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hr.amarek.web_project.security.AuthToken;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class AuthDto {

    @JsonProperty("authtoken")
    private AuthToken token;
    @JsonProperty("user")
    private UserDto user;

}
