package com.cristi.mentool.mentoolfront.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import static java.util.Arrays.asList;

@Embeddable
@Access(AccessType.FIELD)
public class UniqueId extends BaseValueObject<UniqueId> implements Serializable {
    @Column(name = "ID")
    private final String value;

    public UniqueId() {
        super(UniqueId.class);
        this.value = UUID.randomUUID().toString();
    }

    @Override
    protected List<Object> attributesToIncludeInEqualityCheck() {
        return asList(value);
    }

    public String getValue() {
        return value;
    }
}
