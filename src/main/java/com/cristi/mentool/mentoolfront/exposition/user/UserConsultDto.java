package com.cristi.mentool.mentoolfront.exposition.user;

import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserConsultDto {
    @JsonProperty private String email;
    @JsonProperty private String firstName;
    @JsonProperty private String lastName;
    @JsonProperty private Role role;
    @JsonProperty private boolean isNotLocked;

    public UserConsultDto(User user) {
        this.email = user.getId().getValue();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.role = user.getRole();
        this.isNotLocked = user.isAccountNonLocked();
    }
}
