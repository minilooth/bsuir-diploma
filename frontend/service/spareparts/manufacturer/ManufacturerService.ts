import {IncomingHttpHeaders} from "http";
import {Manufacturer, ProcessManufacturer} from "types/spareparts/manufacturer";
import {Axios} from "core/axios";

enum ManufacturerRoutes {
  ALL = '/all'
}

export class ManufacturerService {

  private static readonly URL = '/manufacturer';

  static async getAll(headers?: IncomingHttpHeaders): Promise<Manufacturer[]> {
    const {data: manufacturers} = await Axios.get<Manufacturer[]>(this.URL + ManufacturerRoutes.ALL, {headers});
    return manufacturers;
  }

  static async getById(id: string | number, headers?: IncomingHttpHeaders): Promise<Manufacturer> {
    const {data: manufacturer} = await Axios.get<Manufacturer>(`${this.URL}/${id}`, {headers});
    return manufacturer;
  }

  static async add(processManufacturer: ProcessManufacturer): Promise<Manufacturer> {
    const {data: manufacturer} = await Axios.put<Manufacturer>(this.URL, processManufacturer);
    return manufacturer;
  }

  static async update(id: string | number, processManufacturer: ProcessManufacturer): Promise<Manufacturer> {
    const {data: manufacturer} = await Axios.patch<Manufacturer>(`${this.URL}/${id}`, processManufacturer);
    return manufacturer;
  }

  static async delete(id: string | number): Promise<Manufacturer> {
    const {data: manufacturer} = await Axios.delete<Manufacturer>(`${this.URL}/${id}`);
    return manufacturer;
  }

}
