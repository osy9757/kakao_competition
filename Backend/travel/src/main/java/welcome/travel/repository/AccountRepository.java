package welcome.travel.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import welcome.travel.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
}
