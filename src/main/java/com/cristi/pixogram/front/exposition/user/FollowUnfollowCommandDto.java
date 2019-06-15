package com.cristi.pixogram.front.exposition.user;

import com.cristi.pixogram.front.domain.EmailAddress;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowUnfollowCommandDto {
    @JsonProperty public String follower;
    @JsonProperty public String toFollowOrToUnfollow;

    public EmailAddress followerAddress() {
        return new EmailAddress(follower);
    }

    public EmailAddress toFollowOrToUnfollowAddress() {
        return new EmailAddress(toFollowOrToUnfollow);
    }
}
