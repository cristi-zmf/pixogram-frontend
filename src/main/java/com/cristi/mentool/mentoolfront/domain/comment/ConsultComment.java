package com.cristi.mentool.mentoolfront.domain.comment;

import com.cristi.mentool.mentoolfront.domain.UniqueId;
import com.cristi.mentool.mentoolfront.domain.user.User;
import com.cristi.mentool.mentoolfront.domain.user.Users;
import com.cristi.mentool.mentoolfront.exposition.comment.CommentDetailsDto;
import com.cristi.mentool.mentoolfront.infra.comment.CommentFeignClient;
import org.springframework.stereotype.Service;

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
        User authorDetails = users.findById(commentDetails.authorAsEmailAddress());
        return commentDetails.resolveNames(authorDetails);
    }
}
