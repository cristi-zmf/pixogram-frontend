package com.cristi.mentool.mentoolfront.domain.user;

import com.cristi.mentool.mentoolfront.domain.BaseEntity;
import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.Role;
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
public class User extends BaseEntity<User, EmailAddress> implements UserDetails {
    @NotNull
    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotBlank
    @Column(name = "FIRST_NAME")
    private String firstName;

    @NotBlank
    @Column(name = "LAST_NAME")
    private String lastName;

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


    public User(
            @NotNull EmailAddress username, @NotNull Role role, @NotBlank String passwordHash,
            String firstName, String lastName
    ) {
        super(User.class, username);
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.accountNonLocked = true;
        this.accountNonExpired = true;
        this.credentialNonExpired = true;
        this.enabled = true;
        validate(this);
    }

    /*Used by jpa*/
    public User() {
        super(User.class, null);
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

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
