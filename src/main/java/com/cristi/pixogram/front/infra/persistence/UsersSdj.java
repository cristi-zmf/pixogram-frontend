package com.cristi.pixogram.front.infra.persistence;

import com.cristi.pixogram.front.domain.EmailAddress;
import com.cristi.pixogram.front.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersSdj extends JpaRepository<User, EmailAddress> {
}
