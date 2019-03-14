package com.cristi.mentool.mentoolfront.exposition.authority;

import com.cristi.mentool.mentoolfront.domain.EmailAddress;
import com.cristi.mentool.mentoolfront.domain.Role;
import com.cristi.mentool.mentoolfront.domain.security.Authorities;
import com.cristi.mentool.mentoolfront.domain.security.Authority;
import com.cristi.mentool.mentoolfront.domain.security.RoleConstants;
import com.cristi.mentool.mentoolfront.exposition.MentoolRequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.annotation.security.RolesAllowed;
import java.util.Set;

import static com.cristi.mentool.mentoolfront.domain.security.RoleConstants.ADMIN;
import static java.util.stream.Collectors.toSet;

@MentoolRequestMapping
public class AuthorityResource {

    private Authorities authorities;

    public AuthorityResource(Authorities authorities) {
        this.authorities = authorities;
    }

    @GetMapping(value = "/authorities")
    public Set<AuthorityDto> getAuthorities() throws AuthenticationException {
        return authorities.findAll().stream()
                .map(AuthorityDto::new)
                .collect(toSet());
    }

    @PostMapping("/authorities/{accountAddress}/lock")
    @RolesAllowed({RoleConstants.ADMIN})
    public ResponseEntity<Boolean> lockUserAccount(@PathVariable EmailAddress accountAddress) {
        Authority userAuthority = authorities.findById(accountAddress);
        userAuthority.lockUser();
        return ResponseEntity.ok(true);
    }

    @PostMapping("/authorities/{accountAddress}/unlock")
    @RolesAllowed({RoleConstants.ADMIN})
    public ResponseEntity<Boolean> unlockUserAccount(@PathVariable EmailAddress accountAddress) {
        Authority userAuthority = authorities.findById(accountAddress);
        userAuthority.unlockUser();
        return ResponseEntity.ok(true);
    }

}
