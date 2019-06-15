package com.cristi.pixogram.front.domain.user;

import com.cristi.pixogram.front.domain.EmailAddress;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
public class IdentitySupplier implements Supplier<User> {
    private final Users users;

    public IdentitySupplier(Users users) {
        this.users = users;
    }

    @Override
    public User get() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        EmailAddress currentLoggedUserAddress = new EmailAddress(userDetails.getUsername());
        return users.findById(currentLoggedUserAddress);
    }
}
