import {ProcessSubcategory, Subcategory} from "types/spareparts/catalog/subcategory";
import {Axios} from "core/axios";
import {IncomingHttpHeaders} from "http";

enum SubcategoryRoutes {
  ALL = "/all"
}

export class SubcategoryService {

  private static readonly URL = '/subcategory';

  static async getAll(id: number, headers?: IncomingHttpHeaders): Promise<Subcategory[]> {
    const {data: subcategories} = await Axios.get<Subcategory[]>(`${this.URL + SubcategoryRoutes.ALL}/${id}`, {headers});
    return subcategories;
  }

  static async getById(id: number | string, headers: IncomingHttpHeaders = {}): Promise<Subcategory> {
    const {data: subcategory} = await Axios.get<Subcategory>(`${this.URL}/${id}`, {headers});
    return subcategory;
  }

  static async add(processSubcategory: ProcessSubcategory): Promise<Subcategory> {
    const {data: subcategory} = await Axios.put<Subcategory>(this.URL, processSubcategory);
    return subcategory;
  }

  static async update(id: number, processSubcategory: ProcessSubcategory): Promise<Subcategory> {
    const {data: subcategory} = await Axios.patch<Subcategory>(`${this.URL}/${id}`, processSubcategory);
    return subcategory;
  }

  static async delete(id: number | string): Promise<Subcategory> {
    const {data: subcategory} = await Axios.delete<Subcategory>(`${this.URL}/${id}`);
    return subcategory;
  }

}
