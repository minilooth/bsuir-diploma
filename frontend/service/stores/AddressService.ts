import {IncomingHttpHeaders} from "http";
import {Address, ProcessAddress} from "types/stores/address";
import {Axios} from "core/axios";

export class AddressService {

  private static readonly URL = '/address';

  static async getAll(headers?: IncomingHttpHeaders): Promise<Address[]> {
    const {data: addresses} = await Axios.get<Address[]>(this.URL, {headers});
    return addresses;
  }

  static async add(processAddress: ProcessAddress): Promise<Address> {
    const {data: address} = await Axios.put<Address>(this.URL, processAddress);
    return address;
  }

  static async update(id: number | string, processAddress: ProcessAddress): Promise<Address> {
    const {data: address} = await Axios.patch<Address>(`${this.URL}/${id}`, processAddress);
    return address;
  }

  static async delete(id: number | string): Promise<Address> {
    const {data: address} = await Axios.delete<Address>(`${this.URL}/${id}`);
    return address;
  }

}
