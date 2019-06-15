package com.cristi.pixogram.front.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import static java.util.Arrays.asList;

@Embeddable
@Access(AccessType.FIELD)
public class UniqueId extends BaseValueObject<UniqueId> implements Serializable {
    @Column(name = "ID")
    @NotNull
    private final String value;

    public UniqueId() {
        super(UniqueId.class);
        this.value = UUID.randomUUID().toString();
        validate(this);
    }

    public UniqueId(String value) {
        super(UniqueId.class);
        this.value = value;
        validate(this);
    }

    @Override
    protected List<Object> attributesToIncludeInEqualityCheck() {
        return asList(value);
    }

    public String getValue() {
        return value;
    }
}
