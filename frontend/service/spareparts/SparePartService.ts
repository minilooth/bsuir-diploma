import {Availability, ProcessSparePart, SparePart, SparePartFilter, SparePartList} from "types/spareparts/sparePart";
import {IncomingHttpHeaders} from "http";
import {Axios} from "core/axios";

enum Endpoints {
  UPDATE_AVAILABILITY = '/availability'
}

export class SparePartService {

  private static readonly URL = '/spare-part';

  static async getAll(filter: SparePartFilter, headers?: IncomingHttpHeaders): Promise<SparePartList> {
    const {data: spareParts} = await Axios.post<SparePartList>(this.URL, filter, {headers});
    return spareParts;
  }

  static async add(processSparePart: ProcessSparePart): Promise<SparePart> {
    const {data: sparePart} = await Axios.put<SparePart>(this.URL, processSparePart);
    return sparePart;
  }

  static async update(id: number | string, processSparePart: ProcessSparePart): Promise<SparePart> {
    const {data: sparePart} = await Axios.patch<SparePart>(`${this.URL}/${id}`, processSparePart);
    return sparePart;
  }

  static async delete(id: number | string): Promise<SparePart> {
    const {data: sparePart} = await Axios.delete<SparePart>(`${this.URL}/${id}`);
    return sparePart;
  }

  static async updateAvailability(id: number | string, availabilities: Availability[]): Promise<SparePart> {
    const {data: sparePart} = await Axios.post<SparePart>(`${this.URL + Endpoints.UPDATE_AVAILABILITY}/${id}`, availabilities);
    return sparePart;
  }


}
