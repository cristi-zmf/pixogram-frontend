package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersSdj extends JpaRepository<User, EmailAddress> {
}
