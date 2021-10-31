import {Subcategory} from "types/spareparts/catalog/subcategory";

export interface Group {
  id: number;
  subcategory: Subcategory;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessGroup {
  subcategory: Subcategory;
  name: string;
}
