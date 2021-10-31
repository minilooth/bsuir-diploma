export interface Address {
  id: number;
  street: string;
  house: string;
  housing: string;
  room: string;
  full: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessAddress {
  street: string;
  house: string;
  housing: string;
  room: string;
}
