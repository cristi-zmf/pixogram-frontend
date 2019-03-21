package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.security.Users;
import com.cristi.mentool.mentoolfront.domain.security.User;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@Repository(value = "userService")
@Primary
public class SdjUsers implements Users {
    private final UserSdj sdj;


    public SdjUsers(UserSdj sdj) {
        this.sdj = sdj;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return sdj.findById(new EmailAddress(username)).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public User add(User user) {
        return sdj.saveAndFlush(user);
    }

    @Override
    public Set<User> findAll() {
        return new HashSet<>(sdj.findAll());
    }

    @Override
    public boolean exists(EmailAddress address) {
        return sdj.existsById(address);
    }

    @Override
    public User findById(EmailAddress address) {
        return sdj.findById(address).orElseThrow(NoSuchElementException::new);
    }
}