package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import static com.cristi.mentool.mentoolfront.exposition.user.UserConsultDto.toUserConsultDtoFollowedBy;

@Service
public class ConsultUser {
    private final Users users;

    public ConsultUser(Users users) {
        this.users = users;
    }

    public UserConsultDto consultUser(EmailAddress emailAddress) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        EmailAddress loggedEmailAddress = new EmailAddress(userDetails.getUsername());
        User userToConsult = users.findById(emailAddress);
        User loggedUser = users.findById(loggedEmailAddress);
        return toUserConsultDtoFollowedBy(userToConsult, loggedUser);
    }
}
