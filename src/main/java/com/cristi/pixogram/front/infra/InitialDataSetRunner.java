package com.cristi.pixogram.front.infra;

import com.cristi.pixogram.front.domain.user.AddNewUser;
import com.cristi.pixogram.front.exposition.user.UserCreateCommandDto;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

@Component
@Transactional
public class InitialDataSetRunner implements ApplicationRunner {
    private final AddNewUser addNewUser;

    public InitialDataSetRunner(AddNewUser addNewUser) {
        this.addNewUser = addNewUser;
    }

    @Override
    public void run(ApplicationArguments args) {
        UserCreateCommandDto cristi = new UserCreateCommandDto(
                "cristi@cristi.com", "Cristi", "Cucumber", "cristi"
        );
        UserCreateCommandDto linus = new UserCreateCommandDto(
                "linus@linus.com", "Linus", "Torvalds", "linus"
        );
        UserCreateCommandDto edward = new UserCreateCommandDto(
                "edward@edward.com", "Edward", "The chief", "edward"
        );
        UserCreateCommandDto john = new UserCreateCommandDto(
                "john@john.com", "John", "Baiat bun", "john"
        );
        UserCreateCommandDto hercules = new UserCreateCommandDto(
                "hercules@hercules.com", "Hercules", "The Will bender", "hercules"
        );
        UserCreateCommandDto admin = new UserCreateCommandDto(
                "admin@admin.com", "Admin", "The Admin", "admin"
        );
        Stream.of(cristi, linus, edward, john, hercules, admin).forEach(addNewUser::addUserFor);
    }
}
