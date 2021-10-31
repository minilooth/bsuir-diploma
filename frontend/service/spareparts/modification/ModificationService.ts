import {IncomingHttpHeaders} from "http";
import {Modification, ProcessModification} from "types/spareparts/modification";
import {Axios} from "core/axios";

export class ModificationService {

  private static readonly URL = '/modification';

  static async getAll(headers?: IncomingHttpHeaders): Promise<Modification[]> {
    const {data: modifications} = await Axios.get<Modification[]>(this.URL, {headers});
    return modifications;
  }

  static async add(processModification: ProcessModification): Promise<Modification> {
    const {data: modification} = await Axios.put<Modification>(this.URL, processModification);
    return modification;
  }

  static async update(id: number | string, processModification: ProcessModification): Promise<Modification> {
    const {data: modification} = await Axios.patch<Modification>(`${this.URL}/${id}`, processModification);
    return modification;
  }

  static async delete(id: number | string): Promise<Modification> {
    const {data: modification} = await Axios.delete(`${this.URL}/${id}`);
    return modification;
  }

}
