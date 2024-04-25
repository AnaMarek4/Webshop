package hr.amarek.web_project.dto;

import hr.amarek.web_project.model.Review;
import hr.amarek.web_project.model.user.User;

import java.time.LocalDateTime;


public class Mapper {

    public static ReviewDto reviewToDto(final Review review) {
        return new ReviewDto(
                review.getId(),
                review.getName(),
                review.getRating(),
                review.getComment(),
                review.getTimestamp()
        );
    }

    public static Review mapReviewCreateDtoToEntity(final Review review, final CreateReviewDto reviewUpdateDto) throws RuntimeException {
        reviewUpdateDto.getName().ifPresent(review::setName);
        reviewUpdateDto.getRating().ifPresent(review::setRating);
        reviewUpdateDto.getComment().ifPresent(review::setComment);
        review.setTimestamp(LocalDateTime.now());
        return review;
    }

    public static UserDto userToDto(final User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getIsActive(),
                user.getAvatarUrl(),
                user.getDateOfSignUp(),
                user.getRoles()
        );
    }

    public static User CreateUserToEntity(final CreateUserDto user) {
        User userEntity = new User();

        userEntity.setUsername(user.getUsername());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        user.getOptionalOfFirstName().ifPresent(userEntity::setFirstName);
        user.getOptionalOfLastName().ifPresent(userEntity::setLastName);
        userEntity.setAvatarUrl("");

        return userEntity;
    }
}
