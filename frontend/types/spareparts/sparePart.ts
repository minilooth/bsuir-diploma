import {Modification} from "types/spareparts/modification";
import {Store} from "types/stores/store";
import {Manufacturer} from "types/spareparts/manufacturer";
import {Make} from "types/spareparts/vehicle/make";
import {Model} from "types/spareparts/vehicle/model";
import {Generation} from "types/spareparts/vehicle/generation";
import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Group} from "types/spareparts/catalog/group";
import {SortDirection} from "types/common/sort-direction";
import {Image} from "types/image";

export interface SparePart {
  id: number;
  name: string;
  manufacturer: Manufacturer;
  article: string;
  description: string;
  purchasePrice: number;
  purchasePriceUsd: number;
  purchasePriceEur: number;
  retailPrice: number;
  retailPriceUsd: number;
  retailPriceEur: number;
  characteristics: Characteristic[],
  availabilities: Availability[],
  totalQuantity: number;
  make: Make,
  model: Model,
  generation: Generation;
  category: Category;
  subcategory: Subcategory;
  group: Group;
  image: Image;
  createdAt: Date;
  updatedAt: Date;
}

export interface Characteristic {
  id: CharacteristicKey;
  modification: Modification;
  value: string;
}

export interface CharacteristicKey {
  sparePartId: number;
  modificationId: number;
}

export interface Availability {
  id: AvailabilityKey;
  store: Store;
  quantity: number;
}

interface AvailabilityKey {
  storeId: number;
  sparePartId: number;
}

export interface SparePartList {
  spareParts: SparePart[];
  pages: number;
}

export enum SparePartSort {
  NAME,
  MANUFACTURER,
  ARTICLE,
  PURCHASE_PRICE,
  RETAIL_PRICE,
  MAKE,
  MODEL,
  GENERATION,
  CATEGORY,
  SUBCATEGORY,
  GROUP
}


export interface ProcessSparePart {
  name: string;
  manufacturer: Manufacturer;
  article: string;
  purchasePrice: number;
  retailPrice: number;
  characteristics: Characteristic[],
  make: Make,
  model: Model,
  generation: Generation;
  category: Category;
  subcategory: Subcategory;
  group: Group;
  image: Image;
}

export interface SparePartSortItem {
  field: SparePartSort;
  label: string;
  query: string;
}

export const SparePartSortItems: SparePartSortItem[] = [
  {field: SparePartSort.NAME, label: 'Название', query: 'name'},
  {field: SparePartSort.MANUFACTURER, label: 'Производитель', query: 'manufacturerId'},
  {field: SparePartSort.ARTICLE, label: 'Артикул', query: 'article'},
  {field: SparePartSort.PURCHASE_PRICE, label: 'Закупочная цена', query: 'purchasePrice'},
  {field: SparePartSort.RETAIL_PRICE, label: 'Розничная цена', query: 'retailPrice'},
  {field: SparePartSort.MAKE, label: 'Марка', query: 'makeId'},
  {field: SparePartSort.MODEL, label: 'Модель', query: 'modelId'},
  {field: SparePartSort.GENERATION, label: 'Поколение', query: 'generationId'},
  {field: SparePartSort.CATEGORY, label: 'Категория', query: 'categoryId'},
  {field: SparePartSort.SUBCATEGORY, label: 'Подкатегория', query: 'subcategoryId'},
  {field: SparePartSort.GROUP, label: 'Группа', query: 'groupId'}
]

export interface SparePartFilter {
  sort: string;
  sortDirection: string;
  manufacturerId: number;
  article: string;
  purchasePriceFrom: number;
  purchasePriceTo: number;
  retailPriceFrom: number;
  retailPriceTo: number;
  availabilityFrom: number;
  availabilityTo: number;
  makeId: number;
  modelId: number;
  generationId: number;
  categoryId: number;
  subcategoryId: number;
  groupId: number;
  search: string;
  page: number;
}
