package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto;
import org.springframework.stereotype.Service;

import static com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto.toUserConsultDtoFollowedBy;

@Service
public class ConsultUser {
    private final Users users;
    private final IdentitySupplier identitySupplier;

    public ConsultUser(Users users, IdentitySupplier identitySupplier) {
        this.users = users;
        this.identitySupplier = identitySupplier;
    }

    public UserConsultDto consultUser(EmailAddress emailAddress) {
        User loggedUser = identitySupplier.get();
        User userToConsult = users.findById(emailAddress);
        return toUserConsultDtoFollowedBy(userToConsult, loggedUser);
    }
}
