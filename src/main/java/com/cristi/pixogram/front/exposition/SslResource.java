package com.cristi.pixogram.front.exposition;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;

@PixogramBaseRequestMapping
public class SslResource {

    @GetMapping(value = "/protected-string", produces = MediaType.TEXT_PLAIN_VALUE)
    public String someSslProtectedString() {
        return "You got my protected string";
    }
}
