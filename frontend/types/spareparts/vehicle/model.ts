import {Make} from "types/spareparts/vehicle/make";

export interface Model {
  id: number;
  make: Make;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessModel {
  make: Make;
  name: string;
}
