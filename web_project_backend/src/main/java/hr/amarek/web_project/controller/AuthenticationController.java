package hr.amarek.web_project.controller;

import hr.amarek.web_project.dto.AuthDto;
import hr.amarek.web_project.dto.Mapper;
import hr.amarek.web_project.dto.UserDto;
import hr.amarek.web_project.model.user.User;
import hr.amarek.web_project.model.user.UserLogin;
import hr.amarek.web_project.security.AuthToken;
import hr.amarek.web_project.security.TokenProvider;
import hr.amarek.web_project.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/api/token")
public class AuthenticationController {
    public String currentUsername;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;


    @Operation(description = "Generate user token", summary = "Log in by providing username and password.")
    @RequestMapping(value = "/generate-token", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody UserLogin userLogin) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLogin.getUsername(),
                        userLogin.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User authenticatedUser = userService.findOne(userLogin.getUsername());
        Long userId = authenticatedUser.getId();
        final String token = jwtTokenUtil.generateToken(authentication, userId);
        currentUsername = jwtTokenUtil.getUsernameFromToken(token);
        AuthDto authDto = new AuthDto(new AuthToken(token),
                Mapper.userToDto(authenticatedUser));
        return ResponseEntity.ok(authDto);
    }

    @Operation(description = "Returns current user", summary = "Returns currently logged in user.")
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/current-user")
    public ResponseEntity<UserDto> getCurrentUser(HttpServletRequest request) {
        User user = userService.findOne(request.getUserPrincipal().getName());

        UserDto userDto = Mapper.userToDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}
