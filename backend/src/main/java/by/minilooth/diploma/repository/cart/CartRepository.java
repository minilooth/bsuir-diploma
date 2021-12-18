package by.minilooth.diploma.repository.cart;

import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.QueryHint;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "Cart.findByUser")
    Cart findByUser(User user);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false")
    }, forCounting = false)
    @Query(name = "Cart.findAllByItemsSparePart")
    List<Cart> findAllByItemsSparePart(SparePart sparePart);

}
