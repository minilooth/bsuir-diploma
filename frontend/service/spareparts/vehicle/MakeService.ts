import {Axios} from "core/axios";
import {Make, ProcessMake} from "types/spareparts/vehicle/make";
import {IncomingHttpHeaders, IncomingMessage} from "http";

enum MakeRoutes {
  ALL = "/all"
}

export class MakeService {

  private static readonly URL = '/make';

  static async getAll(headers?: IncomingHttpHeaders): Promise<Make[]> {
    const {data: makes} = await Axios.get<Make[]>(this.URL + MakeRoutes.ALL, {headers});
    return makes;
  }

  static async getById(id: number | string, headers: IncomingHttpHeaders = {}): Promise<Make> {
    const {data: make} = await Axios.get<Make>(`${this.URL}/${id}`, {headers});
    return make;
  }

  static async add(processMake: ProcessMake): Promise<Make> {
    const {data: make} = await Axios.put<Make>(this.URL, processMake);
    return make;
  }

  static async update(id: number | string, processMake: ProcessMake): Promise<Make> {
    const {data: make} = await Axios.patch<Make>(`${this.URL}/${id}`, processMake);
    return make;
  }

  static async delete(id: number | string): Promise<Make> {
    const {data: make} = await Axios.delete<Make>(`${this.URL}/${id}`);
    return make;
  }

}
