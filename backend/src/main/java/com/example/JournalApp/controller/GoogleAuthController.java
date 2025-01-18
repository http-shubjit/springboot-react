package com.example.JournalApp.controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.JournalApp.entity.User;
import com.example.JournalApp.repository.UserRepository;
import com.example.JournalApp.service.UserDetailsServiceImpl;
import com.example.JournalApp.utilis.JwtUtil;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/auth/google")
@Slf4j
public class GoogleAuthController {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

@Autowired   
private RestTemplate restTemplate;
@Autowired
private PasswordEncoder passwordEncoder;
@Autowired
private UserRepository userRepository;
@Autowired
private UserDetailsServiceImpl userDetailsServiceImpl;

@Autowired
private JwtUtil jwtUtil;

@GetMapping("/callback")
public ResponseEntity<?> handleGoogleCallback(@RequestParam String code) {
    

try {
    String tokenEndpoint = "https://oauth2.googleapis.com/token";
    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("code", code);
    params.add("client_id", clientId);
    params.add("client_secret", clientSecret);
    params.add("redirect_uri", "https://developers.google.com/oauthplayground");
    params.add("grant_type", "authorization_code");
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
    ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenEndpoint, request, Map.class);
    String idToken = (String) tokenResponse.getBody().get("id_token");
    String userInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
    ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);
    if (userInfoResponse.getStatusCode() == HttpStatus.OK) {
        Map<String, Object> userInfo = userInfoResponse.getBody();
        String email = (String) userInfo.get("email");
        UserDetails userDetails = null;
        try {
            userDetails = userDetailsServiceImpl.loadUserByUsername(email);
        } catch (Exception e) {

            User user = new User();
            user.setUsername(email);
            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            user.setRoles(Arrays.asList("USER"));
            userRepository.save(user);
        }
        String jwtToken = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Collections.singletonMap("token", jwtToken));
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
} catch (Exception e) {
    log.error("Exception occurred while handleGoogleCallback ", e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
}

}

}
