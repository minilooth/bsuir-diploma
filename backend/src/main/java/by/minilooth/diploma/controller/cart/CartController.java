package by.minilooth.diploma.controller.cart;

import by.minilooth.diploma.dto.cart.CartDto;
import by.minilooth.diploma.dto.cart.mapper.CartMapper;
import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.cart.CartItemNotFoundException;
import by.minilooth.diploma.exception.spareparts.AvailabilityNotFoundException;
import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/cart")
@RestController
public class CartController {

    @Autowired private CartService cartService;
    @Autowired private CartMapper cartMapper;

    @GetMapping
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> get() {
        Cart cart = cartService.get();
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> add(@RequestParam("id") Long id,
                                 @RequestParam("quantity") Long quantity,
                                 @RequestParam("storeId") Long storeId)
            throws SparePartNotFoundException, StoreNotFoundException, ActionIsImpossibleException {
        Cart cart = cartService.add(id, quantity, storeId);
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/delete")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> delete(@RequestParam("id") Long id)
            throws SparePartNotFoundException, ActionIsImpossibleException {
        Cart cart = cartService.delete(id);
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/reset")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> reset() {
        Cart cart = cartService.reset();
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/increase")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> increase(@RequestParam("id") Long id) throws SparePartNotFoundException,
            ActionIsImpossibleException, CartItemNotFoundException, AvailabilityNotFoundException {
        Cart cart = cartService.increase(id);
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/decrease")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> decrease(@RequestParam("id") Long id) throws SparePartNotFoundException,
            ActionIsImpossibleException, CartItemNotFoundException, AvailabilityNotFoundException {
        Cart cart = cartService.decrease(id);
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

    @PostMapping("/arrange")
    @PreAuthorize("hasAnyRole('" + Role.ADMIN + "','" + Role.EMPLOYEE + "')")
    public ResponseEntity<?> arrange() throws ActionIsImpossibleException, AvailabilityNotFoundException,
            SparePartNotFoundException, StoreNotFoundException {
        Cart cart = cartService.arrange();
        CartDto cartDto = cartMapper.toDto(cart);
        return ResponseEntity.ok(cartDto);
    }

}
