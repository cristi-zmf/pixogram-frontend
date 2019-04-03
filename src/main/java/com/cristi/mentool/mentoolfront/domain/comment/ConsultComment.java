package com.cristi.mentool.mentoolfront.domain.comment;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.UniqueId;
import com.cristi.mentool.mentoolfront.domain.security.User;
import com.cristi.mentool.mentoolfront.domain.security.Users;
import com.cristi.mentool.mentoolfront.exposition.comment.CommentDetailsDto;
import com.cristi.mentool.mentoolfront.infra.comment.CommentFeignClient;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ConsultComment {
    private final Users users;
    private final CommentFeignClient commentFeignClient;

    public ConsultComment(Users users, CommentFeignClient commentFeignClient) {
        this.users = users;
        this.commentFeignClient = commentFeignClient;
    }

    public CommentDetailsDto consultComment(UniqueId id) {
        CommentDetailsDto commentDetails = commentFeignClient.getComment(id.getValue());
        Set<EmailAddress> addressesToResolve = new HashSet<>();
        addressesToResolve.addAll(commentDetails.likesAsEmailAddresses());
        addressesToResolve.addAll(commentDetails.dislikesAsEmailAddresses());
        addressesToResolve.add(commentDetails.authorAsEmailAddress());
        Map<String, String> addressesToFullNames = users.findAll().stream().filter(u -> addressesToResolve.contains(u.getId()))
                .collect(Collectors.toMap(u -> u.getId().getValue(), User::getFullName));
        return commentDetails.resolveNames(addressesToFullNames);
    }
}
