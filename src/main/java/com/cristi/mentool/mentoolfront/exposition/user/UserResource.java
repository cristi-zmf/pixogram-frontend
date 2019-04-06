package com.cristi.mentool.mentoolfront.exposition.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.user.*;
import com.cristi.mentool.mentoolfront.exposition.PixogramBaseRequestMapping;
import com.cristi.mentool.mentoolfront.exposition.SingleValueDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@PixogramBaseRequestMapping
public class UserResource {
    private final Users users;
    private final ListUsers listUsers;
    private final ListFollowing listFollowing;
    private final FollowUnfollowUser followUnfollowUser;
    private final ConsultUser consultUser;

    public UserResource(Users users, ListUsers listUsers, ListFollowing listFollowing, FollowUnfollowUser followUnfollowUser, ConsultUser consultUser) {
        this.users = users;
        this.listUsers = listUsers;
        this.listFollowing = listFollowing;
        this.followUnfollowUser = followUnfollowUser;
        this.consultUser = consultUser;
    }

    @GetMapping(value = "/users")
    public List<UserConsultDto> getUsers() throws AuthenticationException {
        return listUsers.listUsers();
    }

    @GetMapping(value = "/users/following")
    public List<UserConsultDto> listFollowing() throws AuthenticationException {
        return listFollowing.listFollowing();
    }

    @PutMapping(value = "/users/follow-user")
    public SingleValueDto<String> followUser(@RequestBody FollowUnfollowCommandDto command) {
        return new SingleValueDto<>(followUnfollowUser.followUser(command).getValue());
    }

    @PutMapping(value = "/users/unfollow-user")
    public SingleValueDto<String> unfollowUser(@RequestBody FollowUnfollowCommandDto command) {
        return new SingleValueDto<>(followUnfollowUser.unfollowUser(command).getValue());
    }

    @PostMapping("/users/{accountAddress}/lock")
    @RolesAllowed({RoleConstants.ADMIN})
    public ResponseEntity<Boolean> lockUserAccount(@PathVariable EmailAddress accountAddress) {
        User userUser = users.findById(accountAddress);
        userUser.lockUser();
        return ok(true);
    }

    @GetMapping("/users/{accountAddress}")
    public UserConsultDto getUser(@PathVariable EmailAddress accountAddress) {
        return consultUser.consultUser(accountAddress);
    }

    @PostMapping("/users/{accountAddress}/unlock")
    @RolesAllowed({RoleConstants.ADMIN})
    public ResponseEntity<Boolean> unlockUserAccount(@PathVariable EmailAddress accountAddress) {
        User userUser = users.findById(accountAddress);
        userUser.unlockUser();
        return ok(true);
    }

}
