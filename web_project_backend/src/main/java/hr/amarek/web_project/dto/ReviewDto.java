package hr.amarek.web_project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("rating")
    private Integer rating;
    @JsonProperty("comment")
    private String comment;
    @JsonProperty("timestamp")
    private LocalDateTime timestamp;
}
