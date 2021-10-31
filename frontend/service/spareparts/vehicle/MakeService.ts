import {Axios} from "core/axios";
import {Make, ProcessMake} from "types/spareparts/vehicle/make";
import {IncomingHttpHeaders} from "http";

export class MakeService {

  private static readonly URL = '/make';

  static async getAll(headers?: IncomingHttpHeaders): Promise<Make[]> {
    const {data: makes} = await Axios.get<Make[]>(this.URL, {headers});
    return makes;
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
