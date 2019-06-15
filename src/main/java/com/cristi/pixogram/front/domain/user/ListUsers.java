package com.cristi.pixogram.front.domain.user;

import com.cristi.pixogram.front.exposition.user.UserConsultDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

@Service
public class ListUsers {
    private final Users users;
    private final IdentitySupplier identitySupplier;

    public ListUsers(Users users, IdentitySupplier identitySupplier) {
        this.users = users;
        this.identitySupplier = identitySupplier;
    }

    public List<UserConsultDto> listUsers() {
        User currentUser = identitySupplier.get();
        Set<User> allUsers = users.findAll();
        return allUsers.stream()
                .sorted(comparing(User::getFullName))
                .map(u -> UserConsultDto.toUserConsultDtoFollowedBy(u, currentUser))
                .collect(toList());
    }
}
