import {Axios} from "core/axios";
import {User} from "types/user";
import {LoginParams} from "components/login/LoginCard";

enum AuthRoutes {
  IS_USERNAME_BUSY = '/is-username-busy',
  IS_EMAIL_BUSY = '/is-email-busy',
  IS_PHONE_NUMBER_BUSY = '/is-phone-number-busy',
  REGISTER = '/register',
  LOGIN = "/login"
}

export class AuthService {

  private static readonly URL = '/auth'

  static async isUsernameBusy(username: string): Promise<boolean> {
    const {data: isBusy} = await Axios.get<boolean>(this.URL + AuthRoutes.IS_USERNAME_BUSY,
      {params: {username}});
    return isBusy;
  }

  static async isEmailBusy(email: string): Promise<boolean> {
    const {data: isBusy} = await Axios.get<boolean>(this.URL + AuthRoutes.IS_EMAIL_BUSY, {params: {email}});
    return isBusy;
  }

  static async isPhoneNumberBusy(phoneNumber: string): Promise<boolean> {
    const {data: isBusy} = await Axios.get<boolean>(this.URL + AuthRoutes.IS_PHONE_NUMBER_BUSY,
      {params: {phoneNumber}});
    return isBusy;
  }

  static async register(user: User): Promise<User> {
    const {data: registeredUser} = await Axios.post<User>(this.URL + AuthRoutes.REGISTER, user);
    return registeredUser;
  }

  static async login(params: LoginParams): Promise<User | null> {
    const {data: user} = await Axios.post<User | null>(this.URL + AuthRoutes.LOGIN, params);
    return user;
  }

}
