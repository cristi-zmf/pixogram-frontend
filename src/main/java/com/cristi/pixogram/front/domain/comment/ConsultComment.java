package com.cristi.pixogram.front.domain.comment;

import com.cristi.pixogram.front.domain.UniqueId;
import com.cristi.pixogram.front.domain.user.User;
import com.cristi.pixogram.front.domain.user.Users;
import com.cristi.pixogram.front.exposition.comment.CommentDetailsDto;
import com.cristi.pixogram.front.infra.comment.CommentFeignClient;
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
