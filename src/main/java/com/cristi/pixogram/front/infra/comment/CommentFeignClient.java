package com.cristi.pixogram.front.infra.comment;

import com.cristi.pixogram.front.exposition.comment.CommentDetailsDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient("images")
public interface CommentFeignClient {
    @GetMapping("/images/{imageId}/list-comments")
    List<CommentDetailsDto> listComments(@PathVariable("imageId") String imageId);

    @GetMapping("/images/comments/{id}")
    CommentDetailsDto getComment(@PathVariable("id") String id);
}
