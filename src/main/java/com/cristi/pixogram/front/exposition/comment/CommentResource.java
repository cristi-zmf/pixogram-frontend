package com.cristi.pixogram.front.exposition.comment;

import com.cristi.pixogram.front.domain.UniqueId;
import com.cristi.pixogram.front.domain.comment.ConsultComment;
import com.cristi.pixogram.front.domain.comment.ListCommentsForImage;
import com.cristi.pixogram.front.exposition.PixogramBaseRequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@PixogramBaseRequestMapping
public class CommentResource {
    private final ListCommentsForImage listCommentsForImage;
    private final ConsultComment consultComment;
    public CommentResource(ListCommentsForImage listCommentsForImage, ConsultComment consultComment) {
        this.listCommentsForImage = listCommentsForImage;
        this.consultComment = consultComment;
    }

    @GetMapping("/{imageId}/comments")
    public List<CommentDetailsDto> listAllCommentsForImage(@PathVariable String imageId) {
        return listCommentsForImage.resolveCommentsAuthorsName(new UniqueId(imageId));
    }

    @GetMapping("/comments/{id}")
    public CommentDetailsDto consultComment(@PathVariable String id) {
        return consultComment.consultComment(new UniqueId(id));
    }

}
