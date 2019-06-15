package com.cristi.pixogram.front.exposition.user;

import com.cristi.pixogram.front.domain.user.AddNewUser;
import com.cristi.pixogram.front.domain.user.EditUser;
import com.cristi.pixogram.front.exposition.PixogramBaseRequestMapping;
import com.cristi.pixogram.front.exposition.SingleValueDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

@PixogramBaseRequestMapping
public class UserRegistrationResource {
    private final AddNewUser addNewUser;
    private final EditUser editUser;
    private final RestTemplate restTemplate;

    public UserRegistrationResource(
            AddNewUser addNewUser,
            EditUser editUser, @Autowired @LoadBalanced RestTemplate restTemplate
    ) {
        this.addNewUser = addNewUser;
        this.editUser = editUser;
        this.restTemplate = restTemplate;
    }

    @PostMapping(value = "/users")
    public SingleValueDto<String> registerUser(@RequestBody UserCreateCommandDto registerCommand) throws AuthenticationException {
        return new SingleValueDto<>(addNewUser.addUserFor(registerCommand).getId().getValue());
    }

    @PutMapping(value = "/users")
    public SingleValueDto<String> editUser(@RequestBody UserEditCommandDto command) throws AuthenticationException {
        return new SingleValueDto<>(editUser.editUser(command).getValue());
    }
}
