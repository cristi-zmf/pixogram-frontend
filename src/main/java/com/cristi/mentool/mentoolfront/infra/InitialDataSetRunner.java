package com.cristi.mentool.mentoolfront.infra;

import com.cristi.mentool.mentoolfront.domain.security.AddNewUser;
import com.cristi.mentool.mentoolfront.exposition.UserCreateCommand;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

import static com.cristi.mentool.mentoolfront.domain.Role.USER;

@Component
@Transactional
public class InitialDataSetRunner implements ApplicationRunner {
    private final AddNewUser addNewUser;
    public InitialDataSetRunner(AddNewUser addNewUser) {
        this.addNewUser = addNewUser;
    }

    @Override
    public void run(ApplicationArguments args) {
        UserCreateCommand cristi = new UserCreateCommand(
                "cristi@cristi.com", "Cristi", "Cucumber", USER, "cristi"
        );
        UserCreateCommand linus = new UserCreateCommand(
                "linus@linus.com", "Linus", "Torvalds", USER, "linus"
        );
        UserCreateCommand edward = new UserCreateCommand(
                "edward@edward.com", "Edward", "The chief", USER, "edward"
        );
        UserCreateCommand john = new UserCreateCommand(
                "john@john.com", "John", "Baiat bun", USER, "john"
        );
        UserCreateCommand hercules = new UserCreateCommand(
                "hercules@hercules.com", "Hercules", "The Will bender", USER, "hercules"
        );
        UserCreateCommand admin = new UserCreateCommand(
                "admin@admin.com", "Admin", "The Admin", USER, "admin"
        );
        Stream.of(cristi, linus, edward, john, hercules, admin).forEach(addNewUser::addUserFor);
    }
}
