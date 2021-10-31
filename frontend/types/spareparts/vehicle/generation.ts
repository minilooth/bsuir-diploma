import {Model} from "types/spareparts/vehicle/model";

export interface Generation {
  id: number;
  model: Model;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessGeneration {
  model: Model;
  name: string;
}
