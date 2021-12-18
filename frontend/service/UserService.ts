import {ChangePassword, ProcessUser, User, UserFilter, UserList} from "types/user";
import {IncomingHttpHeaders} from "http";
import {Axios} from "core/axios";

enum UserServiceRoutes {
  GET_ALL = '/all',
  LOCK = '/lock',
  ENABLE = '/enable',
  CHANGE_PASSWORD = '/password',
  UPDATE_PROFILE = '/update-profile'
}

export class UserService {

  private static readonly URL = '/user';

  static async getAll(filter: UserFilter, headers?: IncomingHttpHeaders): Promise<UserList> {
    const {data: userList} = await Axios.post<UserList>(`${this.URL + UserServiceRoutes.GET_ALL}`, filter, {headers});
    return userList;
  }

  static async save(data: ProcessUser): Promise<User> {
    const {data: user} = await Axios.put<User>(`${this.URL}`, data)
    return user;
  }

  static async update(id: number, data: ProcessUser): Promise<User> {
    const {data: user} = await Axios.patch<User>(`${this.URL}/${id}`, data);
    return user;
  }

  static async delete(id: number): Promise<User> {
    const {data: user} = await Axios.delete<User>(`${this.URL}/${id}`);
    return user;
  }

  static async lock(id: number): Promise<User> {
    const {data: user} = await Axios.post<User>(`${this.URL + UserServiceRoutes.LOCK}/${id}`);
    return user;
  }

  static async enable(id: number): Promise<User> {
    const {data: user} = await Axios.post<User>(`${this.URL + UserServiceRoutes.ENABLE}/${id}`);
    return user;
  }

  static async changePassword(data: ChangePassword, id?: number): Promise<User> {
    const {data: user} = await Axios.post<User>(this.URL + UserServiceRoutes.CHANGE_PASSWORD + (id ? `/${id}` : ''), data);
    return user;
  }

  static async updateProfile(data: User): Promise<User> {
    const {data: user} = await Axios.post<User>(this.URL + UserServiceRoutes.UPDATE_PROFILE, data);
    return user;
  }

}
