package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

@Service
public class ListFollowing {
    private final Users users;
    private final IdentitySupplier identitySupplier;

    public ListFollowing(Users users, IdentitySupplier identitySupplier) {
        this.users = users;
        this.identitySupplier = identitySupplier;
    }

    public List<UserConsultDto> listFollowing() {
        User currentUser = identitySupplier.get();
        Set<User> following = users.findAll(currentUser.getFollowing());
        return following.stream()
                .sorted(comparing(User::getFullName))
                .map(u -> UserConsultDto.toUserConsultDtoFollowedBy(u, currentUser))
                .collect(toList());
    }
}
