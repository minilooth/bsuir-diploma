export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isEmailConfirmed: boolean;
  roles: Role[];
  avatar: string;
}

export interface Role {
  authority: string;
}
