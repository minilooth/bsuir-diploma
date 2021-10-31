package by.minilooth.diploma.repository.stores;

import by.minilooth.diploma.models.bean.stores.Address;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.QueryHint;
import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "Store.findAll")
    List<Store> findAll();
    Boolean existsByAddress(Address address);

}
