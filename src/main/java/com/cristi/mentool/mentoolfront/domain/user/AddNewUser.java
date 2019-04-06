package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.exposition.user.UserCreateCommandDto;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
public class AddNewUser {
    private final Users users;
    private final BCryptPasswordEncoder bcryptEncoder;

    public AddNewUser(Users users, BCryptPasswordEncoder bcryptEncoder) {
        this.users = users;
        this.bcryptEncoder = bcryptEncoder;
    }

    public User addUserFor(UserCreateCommandDto command) {
        EmailAddress emailAddress = new EmailAddress(command.username);
        if (users.exists(emailAddress)) {
            throw new IllegalStateException(format("%s is already registered", emailAddress));
        }
        String passwordHash = bcryptEncoder.encode(command.password);
        User newUser = new User(
                emailAddress, Role.USER, passwordHash,
                command.firstName, command.lastName
        );
        return users.add(newUser);
    }
}
