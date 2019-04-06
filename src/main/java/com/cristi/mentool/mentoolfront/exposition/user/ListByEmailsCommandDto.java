package com.cristi.mentool.mentoolfront.exposition.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toSet;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListByEmailsCommandDto {
    @JsonProperty public Set<String> emails;

    public Set<EmailAddress> toEmailAddresses() {
        return emails.stream().map(EmailAddress::new).collect(toSet());
    }
}
