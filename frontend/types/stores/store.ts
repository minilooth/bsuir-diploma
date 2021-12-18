import {Address} from "types/stores/address";
import {Image} from "types/image";
import {SortDirection} from "types/common/sort-direction";

export enum StoreType {
  STORAGE = "STORAGE",
  SHOP = "SHOP"
}

export interface Store {
  id: number;
  name: string;
  type: StoreType;
  address: Address;
  image: Image;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessStore {
  name: string;
  type: StoreType;
  address: Address;
  image: Image;
}

export interface StoreList {
  stores: Store[];
  pages: number;
}

export enum StoreSort {
  NAME,
  STORE_TYPE,
  ADDRESS
}

export interface StoreSortItem {
  field: StoreSort;
  label: string;
  query: string;
}

export interface StoreTypeItem {
  key: StoreType;
  label: string;
  query: string;
}

export const StoreTypes: StoreTypeItem[] = [
  {key: StoreType.STORAGE, label: 'Склад', query: 'storage'},
  {key: StoreType.SHOP, label: 'Магазин', query: 'shop'}
]

export const StoreSortItems: StoreSortItem[] = [
  {field: StoreSort.NAME, label: 'Название', query: 'name'},
  {field: StoreSort.STORE_TYPE, label: 'Тип', query: 'type'},
  {field: StoreSort.ADDRESS, label: 'Адрес', query: 'address'}
]

export interface StoreFilter {
  sort: string;
  sortDirection: string;
  type: string;
  addressId: number;
  search: string;
  page: number;
}
