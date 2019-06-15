package com.cristi.pixogram.front.domain.user;

import com.cristi.pixogram.front.domain.EmailAddress;
import com.cristi.pixogram.front.exposition.user.UserEditCommandDto;
import org.springframework.stereotype.Service;

@Service
public class EditUser {
    private final Users users;
    private final IdentitySupplier identitySupplier;

    public EditUser(Users users, IdentitySupplier identitySupplier) {
        this.users = users;
        this.identitySupplier = identitySupplier;
    }

    public EmailAddress editUser(UserEditCommandDto command) {
        User loggedUser = identitySupplier.get();
        User modifiedUser = loggedUser.modifyUser(command);
        return users.add(modifiedUser).getId();
    }
}
