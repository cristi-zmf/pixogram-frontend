package com.cristi.mentool.mentoolfront.domain;

import java.time.format.DateTimeFormatter;

public class RomanianDateTimeFormatter {
    public static final DateTimeFormatter ROMANIAN_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
}
