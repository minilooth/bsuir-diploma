import {Category} from "types/spareparts/catalog/category";

export interface Subcategory {
  id: number;
  category: Category;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessSubcategory {
  category: Category;
  name: string;
}
