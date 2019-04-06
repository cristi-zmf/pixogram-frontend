package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Set;

public interface Users extends UserDetailsService {
    User add(User user);
    Set<User> findAll();
    boolean exists(EmailAddress address);
    User findById(EmailAddress address);
    Set<User> findAll(Set<EmailAddress> addresses);
}
