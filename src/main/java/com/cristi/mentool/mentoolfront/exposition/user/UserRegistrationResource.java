package com.cristi.mentool.mentoolfront.exposition.user;

import com.cristi.mentool.mentoolfront.domain.user.AddNewUser;
import com.cristi.mentool.mentoolfront.exposition.PixogramBaseRequestMapping;
import com.cristi.mentool.mentoolfront.exposition.SingleValueDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@PixogramBaseRequestMapping
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
    public SingleValueDto<String> registerUser(@RequestBody UserCreateCommand registerCommand) throws AuthenticationException {
        return new SingleValueDto<>(addNewUser.addUserFor(registerCommand).getId().getValue());
    }
}
