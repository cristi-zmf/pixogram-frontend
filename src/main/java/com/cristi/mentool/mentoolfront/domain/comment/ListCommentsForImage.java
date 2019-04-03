package com.cristi.mentool.mentoolfront.domain.comment;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.UniqueId;
import com.cristi.mentool.mentoolfront.domain.security.User;
import com.cristi.mentool.mentoolfront.domain.security.Users;
import com.cristi.mentool.mentoolfront.exposition.comment.CommentDetailsDto;
import com.cristi.mentool.mentoolfront.infra.comment.CommentFeignClient;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class ListCommentsForImage {
    private final CommentFeignClient commentFeignClient;
    private final Users users;

    public ListCommentsForImage(CommentFeignClient commentFeignClient, Users users) {
        this.commentFeignClient = commentFeignClient;
        this.users = users;
    }

    public List<CommentDetailsDto> resolveCommentsAuthorsName(UniqueId imageId) {
        List<CommentDetailsDto> comments = commentFeignClient.listComments(imageId.getValue());
        Set<EmailAddress> namesToResolve = new HashSet<>();
        comments.forEach(c -> namesToResolve.addAll(c.likesAsEmailAddresses()));
        comments.forEach(c -> namesToResolve.addAll(c.dislikesAsEmailAddresses()));
        comments.forEach(c -> namesToResolve.add(c.authorAsEmailAddress()));
        Map<String, String> addressesToFullNames = users.findAll().stream().filter(u -> namesToResolve.contains(u.getId()))
                .collect(Collectors.toMap(u -> u.getId().getValue(), User::getFullName));
        return comments.stream().map(c -> c.resolveNames(addressesToFullNames)).collect(toList());
    }


}
