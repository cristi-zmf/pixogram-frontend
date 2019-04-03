package com.cristi.mentool.mentoolfront.exposition.authentication;


import com.cristi.mentool.mentoolfront.domain.security.User;
import com.cristi.mentool.mentoolfront.exposition.PixogramBaseRequestMapping;
import com.cristi.mentool.mentoolfront.infra.security.TokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@PixogramBaseRequestMapping
public class AuthenticationResource {
    private AuthenticationManager authenticationManager;
    private TokenProvider jwtTokenUtil;

    public AuthenticationResource(AuthenticationManager authenticationManager, TokenProvider jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping(value = "/token/generate-token")
    public AuthentifiedUserDto login(@RequestBody LoginUser loginUser) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User loggedUser = (User) authentication.getPrincipal();
        final String token = jwtTokenUtil.generateToken(authentication);
        return new AuthentifiedUserDto(loggedUser, token);
    }
}
