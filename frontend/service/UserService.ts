import {User} from "types/user";
import {IncomingHttpHeaders} from "http";
import {Axios} from "core/axios";

export class UserService {
  static async getAll(headers?: IncomingHttpHeaders): Promise<User[]> {
    const {data: users} = await Axios.get<User[]>("/user", {headers});
    return users;
  }
}
