package com.cristi.mentool.mentoolfront.infra.persistence;

import com.cristi.mentool.mentoolfront.infra.configurations.AppConfiguration;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public abstract class IntegrationTestWithDataset {
}
