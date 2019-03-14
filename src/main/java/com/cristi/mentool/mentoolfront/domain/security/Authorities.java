package com.cristi.mentool.mentoolfront.domain.security;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Set;

public interface Authorities extends UserDetailsService {
    Authority add(Authority authority);
    Set<Authority> findAll();
    boolean exists(EmailAddress address);
    Authority findById(EmailAddress address);
}
