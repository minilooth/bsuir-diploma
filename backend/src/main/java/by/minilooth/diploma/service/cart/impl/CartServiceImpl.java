package by.minilooth.diploma.service.cart.impl;

import by.minilooth.diploma.exception.ActionIsImpossibleException;
import by.minilooth.diploma.exception.cart.CartItemNotFoundException;
import by.minilooth.diploma.exception.spareparts.AvailabilityNotFoundException;
import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.exception.stores.StoreNotFoundException;
import by.minilooth.diploma.models.bean.cart.Cart;
import by.minilooth.diploma.models.bean.cart.CartItem;
import by.minilooth.diploma.models.bean.deals.Deal;
import by.minilooth.diploma.models.bean.deals.Trade;
import by.minilooth.diploma.models.bean.keys.CartItemKey;
import by.minilooth.diploma.models.bean.keys.TradeKey;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.users.User;
import by.minilooth.diploma.repository.cart.CartRepository;
import by.minilooth.diploma.service.cart.CartService;
import by.minilooth.diploma.service.deals.DealService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import by.minilooth.diploma.service.stores.StoreService;
import by.minilooth.diploma.service.users.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired private CartRepository cartRepository;
    @Autowired private AuthService authService;
    @Autowired private SparePartService sparePartService;
    @Autowired private StoreService storeService;
    @Autowired private DealService dealService;

    @Override
    public void save(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public void save(Collection<Cart> carts) {
        cartRepository.saveAll(carts);
    }

    private void delete(Cart cart) {
        cartRepository.delete(cart);
    }

    @Override
    public List<Cart> getAllBySparePart(SparePart sparePart) {
        return cartRepository.findAllByItemsSparePart(sparePart);
    }

    @Override
    public Cart get() {
        User user = authService.getPrincipal();
        return cartRepository.findByUser(user);
    }

    @Override
    public Cart reset() {
        Cart cart = get();
        cart.setItems(new LinkedHashSet<>());
        save(cart);
        return cart;
    }

    @Override
    public Cart add(Long id, Long quantity, Long storeId)
            throws SparePartNotFoundException, StoreNotFoundException, ActionIsImpossibleException {
        Cart cart = get();
        SparePart sparePart = sparePartService.getById(id);
        Store store = storeService.getById(storeId);

        Availability availability = sparePart.getAvailabilities().stream()
                .filter(a -> Objects.equals(a.getStore().getId(), store.getId())).findAny().orElse(null);

        if (Objects.isNull(availability) || availability.getQuantity() < quantity) {
            throw new ActionIsImpossibleException("Невозможно добавить больше товара, чем есть в наличии");
        }

        Set<CartItem> items = cart.getItems();
        Set<SparePart> spareParts = items.stream().map(CartItem::getSparePart).collect(Collectors.toSet());

        if (spareParts.contains(sparePart)) {
            throw new ActionIsImpossibleException("Данный товар уже в корзине");
        }

        CartItemKey cartItemKey = CartItemKey.builder()
                .cartId(cart.getId())
                .sparePartId(sparePart.getId())
                .build();
        CartItem cartItem = CartItem.builder()
                .sparePart(sparePart)
                .id(cartItemKey)
                .cart(cart)
                .quantity(quantity)
                .store(store)
                .build();

        cart.addItem(cartItem);
        save(cart);
        return cart;
    }

    @Override
    public Cart delete(Long id) throws SparePartNotFoundException {
        Cart cart = get();
        SparePart sparePart = sparePartService.getById(id);
        Set<CartItem> items = cart.getItems().stream()
                .filter(i -> !Objects.equals(i.getSparePart().getId(), sparePart.getId())).collect(Collectors.toSet());
        cart.setItems(items);
        save(cart);
        return cart;
    }

    @Override
    public Cart increase(Long id) throws SparePartNotFoundException, ActionIsImpossibleException,
            CartItemNotFoundException, AvailabilityNotFoundException {
        return updateQuantity(id, 1L);
    }

    @Override
    public Cart decrease(Long id) throws SparePartNotFoundException, ActionIsImpossibleException,
            CartItemNotFoundException, AvailabilityNotFoundException {
        return updateQuantity(id, -1L);
    }

    private Cart updateQuantity(Long id, Long quantity) throws SparePartNotFoundException, ActionIsImpossibleException,
            CartItemNotFoundException, AvailabilityNotFoundException {
        Cart cart = get();
        SparePart sparePart = sparePartService.getById(id);
        Set<CartItem> items = cart.getItems();

        CartItem item = items.stream().filter(i -> Objects.equals(i.getSparePart().getId(), id))
                .findAny().orElseThrow(() -> new CartItemNotFoundException(id));

        if (quantity < 0) {
            if (item.getQuantity() < 2) {
                throw new ActionIsImpossibleException("Действие невозможно!");
            }
        }
        else {
            Store store = item.getStore();
            Availability availability = sparePart.getAvailabilities().stream()
                    .filter(a -> Objects.equals(a.getStore().getId(), store.getId())).findAny()
                    .orElseThrow(() -> new AvailabilityNotFoundException(sparePart.getId(), store.getId()));
            if (availability.getQuantity() < item.getQuantity() + quantity) {
                throw new ActionIsImpossibleException("В данном магазине больше товара нет");
            }
        }
        item.setQuantity(item.getQuantity() + quantity);

        save(cart);
        return cart;
    }

    @Override
    public Cart arrange() throws ActionIsImpossibleException, AvailabilityNotFoundException,
            SparePartNotFoundException, StoreNotFoundException {
        Cart cart = get();
        Set<CartItem> items = cart.getItems();
        Float totalPrice = (float) items.stream().map(i -> i.getQuantity() * i.getSparePart().getRetailPrice())
                .mapToDouble(Float::doubleValue).sum();

        Deal deal = Deal.builder()
                .user(authService.getPrincipal())
                .totalPrice(totalPrice)
                .build();

        Set<Trade> trades = new LinkedHashSet<>();

        for (CartItem item : items) {
            SparePart sparePart = sparePartService.getById(item.getSparePart().getId());
            Store store = storeService.getById(item.getStore().getId());
            trades.add(Trade.builder()
                            .id(TradeKey.builder()
                                    .dealId(deal.getId())
                                    .sparePartId(sparePart.getId())
                                    .build())
                            .deal(deal)
                            .sparePart(sparePart)
                            .quantity(item.getQuantity())
                            .purchasePrice(sparePart.getPurchasePrice())
                            .retailPrice(sparePart.getRetailPrice())
                            .build());
            sparePartService.updateAvailability(sparePart, store, item.getQuantity());
        }

        deal.setTrades(trades);
        dealService.save(deal);
        return reset();
    }
}
