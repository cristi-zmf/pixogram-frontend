package com.cristi.mentool.mentoolfront.exposition.comment;

import com.cristi.mentool.mentoolfront.domain.UniqueId;
import com.cristi.mentool.mentoolfront.domain.comment.ListCommentsForImage;
import com.cristi.mentool.mentoolfront.exposition.PixogramBaseRequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@PixogramBaseRequestMapping
public class CommentResource {
    private final ListCommentsForImage listCommentsForImage;
    public CommentResource(ListCommentsForImage listCommentsForImage) {
        this.listCommentsForImage = listCommentsForImage;
    }

    @GetMapping("/{imageId}/comments")
    public List<CommentDetailsDto> listAllCommentsForImage(@PathVariable String imageId) {
        return listCommentsForImage.resolveCommentsAuthorsName(new UniqueId(imageId));
    }

}
