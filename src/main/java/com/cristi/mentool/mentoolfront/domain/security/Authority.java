package com.cristi.mentool.mentoolfront.domain.security;

import com.cristi.mentool.mentoolfront.domain.BaseEntity;
import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.UniqueId;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Collection;

import static java.util.Collections.singleton;


@Entity(name = "AUTHORITY")
@Access(AccessType.FIELD)
@AttributeOverride(name = "id", column = @Column(name = "EMAIL_ADDRESS"))
public class Authority extends BaseEntity<Authority, EmailAddress> implements UserDetails {
    @NotNull
    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotBlank
    @Column(name = "PASSWORD_HASH")
    private String passwordHash;

    @Column(name = "ACCOUNT_LOCKED")
    private boolean accountNonLocked;

    @Column(name = "ACCOUNT_EXPIRED")
    private boolean accountNonExpired;

    @Column(name = "CREDENTIAL_EXPIRED")
    private boolean credentialNonExpired;

    @Column(name = "ENABLED")
    private boolean enabled;


    public Authority(
            @NotNull EmailAddress username, @NotNull Role role, @NotBlank String passwordHash
    ) {
        super(Authority.class, username);
        this.role = role;
        this.passwordHash = passwordHash;
        this.accountNonLocked = true;
        this.accountNonExpired = true;
        this.credentialNonExpired = true;
        this.enabled = true;
        validate(this);
    }

    /*Used by jpa*/
    public Authority() {
        super(Authority.class, null);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return singleton(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return getId().getValue();
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public Role getRole() {
        return role;
    }

    public void lockUser() {
        accountNonLocked = false;
    }

    public void unlockUser() {
        accountNonLocked = true;
    }
}
