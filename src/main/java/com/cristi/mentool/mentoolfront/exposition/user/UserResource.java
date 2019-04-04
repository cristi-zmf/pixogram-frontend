package com.cristi.mentool.mentoolfront.exposition.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.user.Users;
import com.cristi.mentool.mentoolfront.domain.user.User;
import com.cristi.mentool.mentoolfront.domain.user.RoleConstants;
import com.cristi.mentool.mentoolfront.exposition.PixogramBaseRequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.annotation.security.RolesAllowed;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@PixogramBaseRequestMapping
public class UserResource {

    private Users users;

    public UserResource(Users users) {
        this.users = users;
    }

    @GetMapping(value = "/users")
    public Set<UserConsultDto> getUsers() throws AuthenticationException {
        return users.findAll().stream()
                .map(UserConsultDto::new)
                .collect(toSet());
    }

    @PostMapping("/users/{accountAddress}/lock")
    @RolesAllowed({RoleConstants.ADMIN})
    public ResponseEntity<Boolean> lockUserAccount(@PathVariable EmailAddress accountAddress) {
        User userUser = users.findById(accountAddress);
        userUser.lockUser();
        return ResponseEntity.ok(true);
    }

    @GetMapping("/users/{accountAddress}")
    public UserConsultDto getUser(@PathVariable EmailAddress accountAddress) {
        return new UserConsultDto(users.findById(accountAddress));
    }

    @PostMapping("/users/{accountAddress}/unlock")
    @RolesAllowed({RoleConstants.ADMIN})
    public ResponseEntity<Boolean> unlockUserAccount(@PathVariable EmailAddress accountAddress) {
        User userUser = users.findById(accountAddress);
        userUser.unlockUser();
        return ResponseEntity.ok(true);
    }

}
