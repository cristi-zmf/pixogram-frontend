package com.cristi.pixogram.front.domain;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.CharBuffer;

import static org.junit.Assert.*;

public class EmailAddressTest {

    @Test
    public void name() throws IOException {
        String string = "bla bla bla";
        InputStream inputStream = new ByteArrayInputStream(string.getBytes());
        InputStreamReader reader = new InputStreamReader(inputStream);
        CharBuffer buffer = CharBuffer.allocate(string.length());
        reader.read(buffer);
        Assertions.assertThat(new String(buffer.array())).isEqualTo("bla bla bla");
    }
}
