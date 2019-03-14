package com.cristi.mentool.mentoolfront.infra;

import com.cristi.mentool.mentoolfront.domain.security.AddNewAuthority;
import com.cristi.mentool.mentoolfront.exposition.AuthorityCreateCommand;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

import static com.cristi.mentool.mentoolfront.domain.Role.ADMIN;
import static com.cristi.mentool.mentoolfront.domain.Role.MENTOR;
import static com.cristi.mentool.mentoolfront.domain.Role.USER;

@Component
@Transactional
public class InitialDataSetRunner implements ApplicationRunner {
    private final AddNewAuthority addNewAuthority;
    public InitialDataSetRunner(AddNewAuthority addNewAuthority) {
        this.addNewAuthority = addNewAuthority;
    }

    @Override
    public void run(ApplicationArguments args) {
        AuthorityCreateCommand cristi = new AuthorityCreateCommand("cristi@cristi.com", USER, "cristi");
        AuthorityCreateCommand linus = new AuthorityCreateCommand("linus.coolguy@cool.com", MENTOR, "linus");
        AuthorityCreateCommand edward = new AuthorityCreateCommand("edward@edward.com", MENTOR, "edward");
        AuthorityCreateCommand john = new AuthorityCreateCommand("john@john.com", MENTOR, "john");
        AuthorityCreateCommand hercules = new AuthorityCreateCommand("hercules@power.com", MENTOR, "power");
        AuthorityCreateCommand admin = new AuthorityCreateCommand("admin@admin.com", ADMIN, "admin");
        Stream.of(cristi, linus, edward, john, hercules, admin).forEach(addNewAuthority::addAuthorityFor);
    }
}
