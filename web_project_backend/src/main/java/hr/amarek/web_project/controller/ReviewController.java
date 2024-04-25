package hr.amarek.web_project.controller;

import hr.amarek.web_project.dto.CreateReviewDto;
import hr.amarek.web_project.dto.ReviewDto;
import hr.amarek.web_project.message.ResponseMessage;
import hr.amarek.web_project.security.TokenProvider;
import hr.amarek.web_project.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final TokenProvider tokenProvider;


    @Operation(description = "Add review", summary = "Create new review. Reviews are public")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> addReview(
            @RequestBody @Valid CreateReviewDto createReviewDto
    ) throws RuntimeException {

        String message = "";
        try {
            reviewService.addReview(createReviewDto);
            message = createReviewDto.toString();
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Failed to add review.";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @Operation(description = "Returns list reviews", summary = "Returns list of reviews")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @GetMapping(consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReviewDto>> getAll(HttpServletRequest request) {

        List<ReviewDto> reviews = reviewService.getReviews();
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }
}
