import {Generation, ProcessGeneration} from "types/spareparts/vehicle/generation";
import {Axios} from "core/axios";

export class GenerationService {

  private static readonly URL = '/generation';

  static async getAll(modelId: number | string): Promise<Generation[]> {
    const {data: generations} = await Axios.get<Generation[]>(`${this.URL}/${modelId}`);
    return generations;
  }

  static async add(processGeneration: ProcessGeneration): Promise<Generation> {
    const {data: generation} = await Axios.put<Generation>(this.URL, processGeneration);
    return generation;
  }

  static async update(id: number | string, processGeneration: ProcessGeneration): Promise<Generation> {
    const {data: generation} = await Axios.patch<Generation>(`${this.URL}/${id}`, processGeneration);
    return generation;
  }

  static async delete(id: number | string): Promise<Generation> {
    const {data: generation} = await Axios.delete<Generation>(`${this.URL}/${id}`);
    return generation;
  }

}
