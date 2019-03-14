package com.cristi.mentool.mentoolfront.exposition.registration.user;

import com.cristi.mentool.mentoolfront.exposition.AuthorityCreateCommand;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCreateCommand extends AuthorityCreateCommand {
    @JsonProperty public String firstName;
    @JsonProperty public String lastName;
    @JsonProperty public String phoneNumber;
}
