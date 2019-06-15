package com.cristi.pixogram.front.domain;

import java.time.format.DateTimeFormatter;

public class RomanianDateTimeFormatter {
    public static final DateTimeFormatter ROMANIAN_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
}
