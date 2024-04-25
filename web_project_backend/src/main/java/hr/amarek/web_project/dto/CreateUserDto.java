package hr.amarek.web_project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Data
@Getter
@Setter
@AllArgsConstructor
public class CreateUserDto {

    @JsonProperty("username")
    private String username;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("firstName")
    private Optional<String> optionalOfFirstName = Optional.empty();

    @JsonProperty("lastName")
    private Optional<String> optionalOfLastName = Optional.empty();


}