package com.cristi.pixogram.front.exposition.user;

import com.cristi.pixogram.front.domain.EmailAddress;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

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
