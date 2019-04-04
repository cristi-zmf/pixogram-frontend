package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.exposition.user.FollowUnfollowCommandDto;
import org.springframework.stereotype.Service;

@Service
public class FollowUnfollowUser {

    private final Users users;

    public FollowUnfollowUser(Users users) {
        this.users = users;
    }

    public EmailAddress followUser(FollowUnfollowCommandDto command) {
        User follower = users.findById(command.followerAddress());
        follower.follow(command.toFollowOrToUnfollowAddress());
        return users.add(follower).getId();
    }

    public EmailAddress unfollowUser(FollowUnfollowCommandDto command) {
        User follower = users.findById(command.followerAddress());
        follower.unfollow(command.toFollowOrToUnfollowAddress());
        return users.add(follower).getId();
    }
}
