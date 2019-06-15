package com.cristi.pixogram.front.exposition.user;

import com.cristi.pixogram.front.domain.Role;
import com.cristi.pixogram.front.domain.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserConsultDto {
    @JsonProperty private String email;
    @JsonProperty private String firstName;
    @JsonProperty private String lastName;
    @JsonProperty private Role role;
    @JsonProperty private boolean subscribed;

    public UserConsultDto(User user) {
        this.email = user.getId().getValue();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.role = user.getRole();
    }

    public static UserConsultDto toUserConsultDtoFollowedBy(User userToMap, User follower) {
        boolean isFollowed = userToMap.isFollowedBy(follower);
        UserConsultDto userDto = new UserConsultDto(userToMap);
        userDto.subscribed = isFollowed;
        return userDto;
    }
}
