package by.minilooth.diploma.repository.stores;

import by.minilooth.diploma.models.bean.stores.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
