package com.cristi.mentool.mentoolfront.exposition.registration.mentor;

import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.security.AddNewAuthority;
import com.cristi.mentool.mentoolfront.exposition.MentoolRequestMapping;
import com.cristi.mentool.mentoolfront.exposition.registration.user.UserCreateCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;

import static org.springframework.http.ResponseEntity.ok;

@MentoolRequestMapping
public class MentorRegistrationResource {
    private final AddNewAuthority addNewAuthority;
    private final RestTemplate restTemplate;

    private final static String PERSONS_SERVICE = "http://persons";


    public MentorRegistrationResource(
            AddNewAuthority addNewAuthority,
            @Autowired @LoadBalanced RestTemplate restTemplate
    ) {
        this.addNewAuthority = addNewAuthority;
        this.restTemplate = restTemplate;
    }

    @PutMapping(value = "/mentors")
    public ResponseEntity<String> registerMentor(@Valid @RequestBody MentorRegistrationCommand registerCommand) throws AuthenticationException {
        registerCommand.role = Role.MENTOR;
        addNewAuthority.addAuthorityFor(registerCommand);
        String responseBody = restTemplate.exchange(
                PERSONS_SERVICE + "/persons/mentors", HttpMethod.PUT,
                new HttpEntity<>(registerCommand), String.class
        ).getBody();
        return ok(responseBody);
    }
}
