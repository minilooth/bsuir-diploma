import {SortDirection} from "types/common/sort-direction";
import {Image} from "types/image";

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isEmailConfirmed: boolean;
  isAccountNonLocked: boolean;
  roles: Role[];
  avatar: Image;
}

export interface Role {
  authority: RoleEnum;
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface RoleItem {
  key: RoleEnum,
  label: string;
}

export const RoleItems: RoleItem[] = [
  {key: RoleEnum.ADMIN, label: 'Администратор'},
  {key: RoleEnum.EMPLOYEE, label: 'Сотрудник'}
]

export enum UserSort {
  USERNAME,
  EMAIL,
  FIRSTNAME,
  LASTNAME,
  PHONE_NUMBER,
  CREATED_AT
}

export interface UserSortItem {
  field: UserSort;
  label: string;
  query: string;
}

export const SortItems: UserSortItem[] = [
  {field: UserSort.USERNAME, label: 'Имя пользователя', query: 'username'},
  {field: UserSort.FIRSTNAME, label: 'Имя', query: 'firstname'},
  {field: UserSort.LASTNAME, label: 'Фамилия', query: 'lastname'},
  {field: UserSort.EMAIL, label: 'E-mail', query: 'email'},
  {field: UserSort.PHONE_NUMBER, label: 'Номер телефона', query: 'phoneNumber'},
  {field: UserSort.CREATED_AT, label: 'Дата регистрации', query: 'registerDate'}
]

export interface UserFilter {
  sort: UserSort;
  sortDirection: SortDirection;
  fullname: string;
  email: string;
  phoneNumber: string;
  registerDateFrom: Date;
  registerDateTo: Date;
  search: string;
  page: number;
}

export interface ProcessUser {
  avatar: Image,
  username: string,
  email: string,
  phoneNumber: string;
  firstname: string;
  middlename: string;
  lastname: string;
  role: Role;
}

export interface ChangePassword {
  oldPassword?: string;
  newPassword: string;
  confirm: string;
}
