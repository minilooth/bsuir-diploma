import {Group, ProcessGroup} from "types/spareparts/catalog/group";
import {Axios} from "core/axios";
import {IncomingHttpHeaders} from "http";

export class GroupService {

  private static readonly URL = '/group';

  static async getAll(subcategoryId: number, headers?: IncomingHttpHeaders): Promise<Group[]> {
    const {data: groups} = await Axios.get<Group[]>(`${this.URL}/${subcategoryId}`, {headers});
    return groups;
  }

  static async add(processGroup: ProcessGroup): Promise<Group> {
    const {data: group} = await Axios.put<Group>(this.URL, processGroup);
    return group;
  }

  static async update(id: number, processGroup: ProcessGroup): Promise<Group> {
    const {data: group} = await Axios.patch<Group>(`${this.URL}/${id}`, processGroup);
    return group;
  }

  static async delete(id: number | string): Promise<Group> {
    const {data: group} = await Axios.delete(`${this.URL}/${id}`);
    return group;
  }

}
