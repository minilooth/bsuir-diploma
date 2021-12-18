import {SparePart} from "types/spareparts/sparePart";
import {Store} from "types/stores/store";

export interface CartItemKey {
  cartId: number;
  sparePartId: number;
}

export interface CartItem {
  id: CartItemKey;
  sparePart: SparePart;
  store: Store;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalCost: number;
  totalCostUsd: number;
  totalCostEur: number;
}
