package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.security.Authorities;
import com.cristi.mentool.mentoolfront.domain.security.Authority;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@Repository(value = "userService")
@Primary
public class SdjAuthorities implements Authorities {
    private final AuthoritiesSdj sdj;


    public SdjAuthorities(AuthoritiesSdj sdj) {
        this.sdj = sdj;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return sdj.findById(new EmailAddress(username)).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public Authority add(Authority authority) {
        return sdj.saveAndFlush(authority);
    }

    @Override
    public Set<Authority> findAll() {
        return new HashSet<>(sdj.findAll());
    }

    @Override
    public boolean exists(EmailAddress address) {
        return sdj.existsById(address);
    }

    @Override
    public Authority findById(EmailAddress address) {
        return sdj.findById(address).orElseThrow(NoSuchElementException::new);
    }
}
