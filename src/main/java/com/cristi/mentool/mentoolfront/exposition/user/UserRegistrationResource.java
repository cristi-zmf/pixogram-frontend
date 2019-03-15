package com.cristi.mentool.mentoolfront.exposition.user;

import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.security.AddNewUser;
import com.cristi.mentool.mentoolfront.exposition.MentoolRequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;

@MentoolRequestMapping
public class UserRegistrationResource {
    private final AddNewUser addNewUser;
    private final RestTemplate restTemplate;

    private final static String PERSONS_SERVICE = "http://persons";


    public UserRegistrationResource(
            AddNewUser addNewUser,
            @Autowired @LoadBalanced RestTemplate restTemplate
    ) {
        this.addNewUser = addNewUser;
        this.restTemplate = restTemplate;
    }

    @PostMapping(value = "/users")
    public String registerUser(@Valid @RequestBody UserCreateCommand registerCommand) throws AuthenticationException {
        registerCommand.role = Role.USER;
        addNewUser.addUserFor(registerCommand);
        return restTemplate.exchange(
                PERSONS_SERVICE + "/persons/users", HttpMethod.POST,
                new HttpEntity<>(registerCommand), String.class
        ).getBody();
    }
}
