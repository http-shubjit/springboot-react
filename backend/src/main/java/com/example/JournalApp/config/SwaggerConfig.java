package com.example.JournalApp.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;

@Configuration
public class SwaggerConfig {
    

    @Bean
    public OpenAPI myCustomeApi() {
     return new OpenAPI().info(new Info().
        title("JournalApp Api").description("By Shubhajit")).servers(
        Arrays.asList(
        new Server().url("http://localhost:8080").description("Devlopement"),
        new Server().url("http://localhost:8081").description("Production")))
        .tags(Arrays.asList(
        new Tag().name("Public Api"),
        new Tag().name("Public Api"),
        new Tag().name("Public Api"),
        new Tag().name("Public Api")
))
 .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components().addSecuritySchemes(
                        "bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .in(SecurityScheme.In.HEADER)
                                .name("Authorization")
                ));
    }
}
