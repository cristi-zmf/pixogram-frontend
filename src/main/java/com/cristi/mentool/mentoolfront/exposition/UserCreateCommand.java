package com.cristi.mentool.mentoolfront.exposition;

import com.cristi.mentool.mentoolfront.domain.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateCommand {
    @JsonProperty
    @NotEmpty
    public String username;
    @JsonProperty
    @NotEmpty
    public String firstName;
    @JsonProperty
    @NotEmpty
    public String lastName;
    @JsonProperty
    public Role role;
    @JsonProperty
    @NotEmpty
    public String password;
}
