package by.minilooth.diploma.service.cart;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.cart.CartItemNotFoundException;
import by.minilooth.diploma.exception.spareparts.AvailabilityNotFoundException;
import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.spareparts.SparePart;

import java.util.Collection;
import java.util.List;

public interface CartService {

    void save(Cart cart);
    void save(Collection<Cart> carts);
    List<Cart> getAllBySparePart(SparePart sparePart);

    Cart get();
    Cart add(Long id, Long quantity, Long storeId) throws SparePartNotFoundException, StoreNotFoundException,
            ActionIsImpossibleException;
    Cart delete(Long id) throws SparePartNotFoundException;
    Cart reset();
    Cart increase(Long id) throws SparePartNotFoundException, ActionIsImpossibleException, CartItemNotFoundException,
            AvailabilityNotFoundException;
    Cart decrease(Long id) throws SparePartNotFoundException, ActionIsImpossibleException, CartItemNotFoundException,
            AvailabilityNotFoundException;
    Cart arrange() throws ActionIsImpossibleException, AvailabilityNotFoundException, SparePartNotFoundException,
            StoreNotFoundException;

}
