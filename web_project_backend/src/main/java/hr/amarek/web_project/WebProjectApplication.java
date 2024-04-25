package hr.amarek.web_project;

import hr.amarek.web_project.model.user.Role;
import hr.amarek.web_project.model.user.User;
import hr.amarek.web_project.repository.RoleRepository;
import hr.amarek.web_project.repository.UserRepository;
import hr.amarek.web_project.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@PropertySources({
		@PropertySource("classpath:application.properties")
})public class WebProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebProjectApplication.class, args);
	}

}
