package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Set;

import static com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto.toUserConsultDtoFollowedBy;
import static java.util.stream.Collectors.toSet;

@Service
public class ListUsers {
    private final Users users;

    public ListUsers(Users users) {
        this.users = users;
    }

    public Set<UserConsultDto> listUsers() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        EmailAddress currentLoggedUserAddress = new EmailAddress(userDetails.getUsername());
        User currentUser = users.findById(currentLoggedUserAddress);
        Set<User> allUsers = users.findAll();
        return allUsers.stream()
                .map(u -> toUserConsultDtoFollowedBy(u, currentUser))
                .collect(toSet());
    }
}
