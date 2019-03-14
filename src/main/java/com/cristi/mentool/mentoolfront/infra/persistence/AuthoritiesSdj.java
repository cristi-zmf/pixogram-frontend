package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.security.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthoritiesSdj extends JpaRepository<Authority, EmailAddress> {
}
