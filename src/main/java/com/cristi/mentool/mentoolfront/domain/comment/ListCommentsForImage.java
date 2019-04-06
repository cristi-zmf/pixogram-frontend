package com.cristi.mentool.mentoolfront.domain.comment;

import com.cristi.mentool.mentoolfront.domain.BaseEntity;
import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.UniqueId;
import com.cristi.mentool.mentoolfront.domain.user.User;
import com.cristi.mentool.mentoolfront.domain.user.Users;
import com.cristi.mentool.mentoolfront.exposition.comment.CommentDetailsDto;
import com.cristi.mentool.mentoolfront.infra.comment.CommentFeignClient;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
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
        comments.forEach(c -> namesToResolve.add(c.authorAsEmailAddress()));
        Map<EmailAddress, User> addressesToFullNames = users.findAll().stream().filter(u -> namesToResolve.contains(u.getId()))
                .collect(Collectors.toMap(User::getId, Function.identity()));
        return comments.stream().map(c -> c.resolveNames(addressesToFullNames.get(c.authorAsEmailAddress()))).collect(toList());
    }


}
