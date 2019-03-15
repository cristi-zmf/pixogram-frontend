package com.cristi.mentool.mentoolfront.exposition.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCreateCommand extends com.cristi.mentool.mentoolfront.exposition.UserCreateCommand {
    @JsonProperty public String firstName;
    @JsonProperty public String lastName;
    @JsonProperty public String phoneNumber;
}
