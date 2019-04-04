package com.cristi.mentool.mentoolfront.exposition.authentication;

import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AuthentifiedUserDto {
    @JsonProperty
    private String token;
    @JsonProperty
    private String username;
    @JsonProperty
    private Role role;


    public AuthentifiedUserDto(String token) {
        this.token = token;
    }
    public AuthentifiedUserDto(User user, String token) {
        this.token = token;
        this.username = user.getUsername();
        this.role = user.getRole();
    }
}
