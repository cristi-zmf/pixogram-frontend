package com.cristi.mentool.mentoolfront.exposition.comment;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetailsDto {
    @JsonProperty public String id;
    @JsonProperty public String author;
    @JsonProperty public String fullName;
    @JsonProperty public String value;
    @JsonProperty public String imageId;
    @JsonProperty public Set<String> likes;
    @JsonProperty public Set<String> dislikes;
    @JsonProperty public LocalDateTime lastModified;

    public Set<EmailAddress> likesAsEmailAddresses() {
        return likes.stream().map(EmailAddress::new).collect(toSet());
    }
    public Set<EmailAddress> dislikesAsEmailAddresses() {
        return dislikes.stream().map(EmailAddress::new).collect(toSet());
    }
    public EmailAddress authorAsEmailAddress() {
        return new EmailAddress(author);
    }

    public CommentDetailsDto resolveNames(Map<String, String> addressesToNames) {
        Set<String> resolvedLikes = likes.stream().map(addressesToNames::get).collect(toSet());
        Set<String> resolvedDislikes = dislikes.stream().map(addressesToNames::get).collect(toSet());
        return new CommentDetailsDto(
                id, author, addressesToNames.get(author), value, imageId, resolvedLikes, resolvedDislikes, lastModified
        );
    }
}
