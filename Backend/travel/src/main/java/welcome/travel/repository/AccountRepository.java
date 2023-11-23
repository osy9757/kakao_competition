package welcome.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import welcome.travel.domain.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
