package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.user.User;
import com.cristi.mentool.mentoolfront.domain.user.Users;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class SdjUsersLocalIT extends IntegrationTestWithDataset {
    @Autowired
    private UsersSdj sdj;

    @Autowired
    private Users sut;

    private User john;

    @Before
    public void setup() {
        sdj.deleteAll();
        john = new User(
                new EmailAddress("john@doe.com"),
                Role.USER, "DONT CARE", "John", "Doe"
        );
        sdj.save(john);
    }
    @Test
    public void exists() {
        assertThat(sut.exists(john.getId())).isTrue();
        assertThat(sut.exists(new EmailAddress("cico@cico.com"))).isFalse();
    }
}