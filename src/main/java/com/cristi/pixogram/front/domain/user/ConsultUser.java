package com.cristi.pixogram.front.domain.user;

import com.cristi.pixogram.front.domain.EmailAddress;
import com.cristi.pixogram.front.exposition.user.UserConsultDto;
import org.springframework.stereotype.Service;

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
        return UserConsultDto.toUserConsultDtoFollowedBy(userToConsult, loggedUser);
    }
}
