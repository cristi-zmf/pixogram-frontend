package com.cristi.pixogram.front.exposition.authentication;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginUser {
    @JsonProperty
    private String username;
    @JsonProperty
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
