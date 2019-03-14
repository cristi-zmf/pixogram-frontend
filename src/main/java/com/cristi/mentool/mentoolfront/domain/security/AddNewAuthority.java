package com.cristi.mentool.mentoolfront.domain.security;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.exposition.AuthorityCreateCommand;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
public class AddNewAuthority {
    private final Authorities authorities;
    private final BCryptPasswordEncoder bcryptEncoder;

    public AddNewAuthority(Authorities authorities, BCryptPasswordEncoder bcryptEncoder) {
        this.authorities = authorities;
        this.bcryptEncoder = bcryptEncoder;
    }

    public Authority addAuthorityFor(AuthorityCreateCommand command) {
        EmailAddress emailAddress = new EmailAddress(command.username);
        if (authorities.exists(emailAddress)) {
            throw new IllegalStateException(format("%s is already registered", emailAddress));
        }
        String passwordHash = bcryptEncoder.encode(command.password);
        Authority newAuthority = new Authority(
                emailAddress, command.role, passwordHash
        );

        return authorities.add(newAuthority);
    }
}
