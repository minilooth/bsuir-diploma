import {Cart} from "types/cart";
import {Axios} from "core/axios";

enum CartRoutes {
  ADD = '/add',
  DELETE = '/delete',
  INCREASE = '/increase',
  DECREASE = '/decrease',
  RESET = '/reset',
  ARRANGE = '/arrange'
}

export class CartService {

  private static readonly URL = '/cart';

  static async get(): Promise<Cart> {
    const {data: cart} = await Axios.get<Cart>(this.URL);
    return cart;
  }

  static async add(sparePartId: number, storeId: number, quantity: number): Promise<Cart> {
    const {data: cart} = await Axios.post<Cart>(this.URL + CartRoutes.ADD, null, {
      params: {
        id: sparePartId,
        storeId,
        quantity
      }
    })
    return cart;
  }

  static async delete(sparePartId: number): Promise<Cart> {
    const {data: cart} = await Axios.post<Cart>(this.URL + CartRoutes.DELETE, null, {
      params: {
        id: sparePartId
      }
    })
    return cart;
  }

  static async increase(sparePartId: number): Promise<Cart> {
    const {data: cart} = await Axios.post<Cart>(this.URL + CartRoutes.INCREASE, null, {
      params: {
        id: sparePartId
      }
    })
    return cart;
  }

  static async decrease(sparePartId: number): Promise<Cart> {
    const {data: cart} = await Axios.post<Cart>(this.URL + CartRoutes.DECREASE, null, {
      params: {
        id: sparePartId
      }
    })
    return cart;
  }

  static async reset(): Promise<Cart> {
    const {data: cart} = await Axios.post<Cart>(this.URL + CartRoutes.RESET, null);
    return cart;
  }

  static async arrange(): Promise<Cart> {
    const {data: cart} = await Axios.post<Cart>(this.URL + CartRoutes.ARRANGE, null);
    return cart;
  }

}
