package hr.amarek.web_project.service;

import hr.amarek.web_project.dto.CreateReviewDto;
import hr.amarek.web_project.dto.Mapper;
import hr.amarek.web_project.dto.ReviewDto;
import hr.amarek.web_project.model.Review;
import hr.amarek.web_project.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<ReviewDto> getReviews() {

        Collection<Review> reviews = this.reviewRepository.findAll();
        return reviews.stream()
                .map(Mapper::reviewToDto)
                .collect(Collectors.toList());
    }

    public ReviewDto addReview(CreateReviewDto createReviewDto)  {
        Review review = new Review();
        Mapper.mapReviewCreateDtoToEntity(review, createReviewDto);
        return Mapper.reviewToDto(this.reviewRepository.save(review));

    }


}
