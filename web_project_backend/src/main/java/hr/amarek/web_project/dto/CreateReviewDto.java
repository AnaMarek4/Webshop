package hr.amarek.web_project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Optional;
@Data
public class CreateReviewDto {
    @JsonProperty("name")
    private Optional<String> name;
    @JsonProperty("rating")
    private Optional<Integer> rating;
    @JsonProperty("comment")
    private Optional<String> comment;
}
