import {Model, ProcessModel} from "types/spareparts/vehicle/model";
import {Axios} from "core/axios";
import {IncomingHttpHeaders} from "http";

export class ModelService {

  private static readonly URL = '/model';

  static async getAll(makeId: number | string, headers?: IncomingHttpHeaders): Promise<Model[]> {
    const {data: models} = await Axios.get<Model[]>(`${this.URL}/${makeId}`, {headers});
    return models;
  }

  static async add(processModel: ProcessModel): Promise<Model> {
    const {data: model} = await Axios.put<Model>(this.URL, processModel);
    return model;
  }

  static async update(id: number | string, processModel: ProcessModel): Promise<Model> {
    const {data: model} = await Axios.patch<Model>(`${this.URL}/${id}`, processModel);
    return model;
  }

  static async delete(id: number | string): Promise<Model> {
    const {data: model} = await Axios.delete<Model>(`${this.URL}/${id}`);
    return model;
  }

}
