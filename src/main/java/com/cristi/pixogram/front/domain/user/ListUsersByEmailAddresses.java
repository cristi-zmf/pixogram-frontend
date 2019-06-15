package com.cristi.pixogram.front.domain.user;

import com.cristi.pixogram.front.exposition.user.ListByEmailsCommandDto;
import com.cristi.pixogram.front.exposition.user.UserConsultDto;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

@Service
public class ListUsersByEmailAddresses {
    private final Users users;
    private final IdentitySupplier identitySupplier;

    public ListUsersByEmailAddresses(Users users, IdentitySupplier identitySupplier) {
        this.users = users;
        this.identitySupplier = identitySupplier;
    }

    public List<UserConsultDto> listUsersByEmailAddresses(ListByEmailsCommandDto command) {
        User loggedUser = identitySupplier.get();
        return users.findAll(command.toEmailAddresses()).stream()
                .sorted(comparing(User::getFullName))
                .map(u -> UserConsultDto.toUserConsultDtoFollowedBy(u, loggedUser))
                .collect(toList());
    }
}
