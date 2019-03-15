package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.security.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSdj extends JpaRepository<User, EmailAddress> {
}
