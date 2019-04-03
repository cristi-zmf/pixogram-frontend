package com.cristi.mentool.mentoolfront.infra.comment;

import com.cristi.mentool.mentoolfront.exposition.comment.CommentDetailsDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name = "images")
public interface CommentFeignClient {
    @PutMapping("/{imageId}/list-comments")
    List<CommentDetailsDto> listComments(@PathVariable String imageId);
}
