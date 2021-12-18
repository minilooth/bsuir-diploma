import {Group, ProcessGroup} from "types/spareparts/catalog/group";
import {Axios} from "core/axios";
import {IncomingHttpHeaders} from "http";

enum GroupRoutes {
  ALL = '/all'
}

export class GroupService {

  private static readonly URL = '/group';

  static async getAll(subcategoryId: number, headers?: IncomingHttpHeaders): Promise<Group[]> {
    const {data: groups} = await Axios.get<Group[]>(`${this.URL + GroupRoutes.ALL}/${subcategoryId}`, {headers});
    return groups;
  }

  static async getById(id: number | string, headers: IncomingHttpHeaders = {}): Promise<Group> {
    const {data: group} = await Axios.get<Group>(`${this.URL}/${id}`, {headers});
    return group;
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
