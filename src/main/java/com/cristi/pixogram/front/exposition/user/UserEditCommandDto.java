package com.cristi.pixogram.front.exposition.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEditCommandDto {
    @JsonProperty
    public String firstName;
    @JsonProperty
    public String lastName;
}
