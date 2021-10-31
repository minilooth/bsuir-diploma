import {IncomingHttpHeaders} from "http";
import {ProcessStore, Store, StoreFilter, StoreList} from "types/stores/store";
import {Axios} from "core/axios";

export class StoreService {

  private static readonly URL = '/store';

  static async getAll(filter: StoreFilter, headers?: IncomingHttpHeaders): Promise<StoreList> {
    const {data: stores} = await Axios.post<StoreList>(this.URL, filter, {headers});
    return stores;
  }

  static async add(processStore: ProcessStore): Promise<Store> {
    const {data: store} = await Axios.put<Store>(this.URL, processStore);
    return store;
  }

  static async update(id: number | string, processStore: ProcessStore): Promise<Store> {
    const {data: store} = await Axios.patch<Store>(`${this.URL}/${id}`, processStore);
    return store;
  }

  static async delete(id: number | string): Promise<Store> {
    const {data: store} = await Axios.delete<Store>(`${this.URL}/${id}`);
    return store;
  }

}
