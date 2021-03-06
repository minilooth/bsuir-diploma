import {Category, ProcessCategory} from "types/spareparts/catalog/category";
import {Axios} from "core/axios";
import {IncomingHttpHeaders} from "http";

enum CategoryRoutes {
  ALL = "/all"
}

export class CategoryService {

  private static readonly URL = '/category';

  static async getAll(headers?: IncomingHttpHeaders): Promise<Category[]> {
    const {data: categories} = await Axios.get<Category[]>(this.URL + CategoryRoutes.ALL, {headers});
    return categories;
  }

  static async getById(id: number | string, headers: IncomingHttpHeaders = {}): Promise<Category> {
    try {
      const {data: category} = await Axios.get<Category>(`${this.URL}/${id}`, {headers});
      return category;
    }
    catch(err) {
      console.log(err);
      return {} as Category;
    }
  }

  static async add(processCategory: ProcessCategory): Promise<Category> {
    const {data: category} = await Axios.put<Category>(this.URL, processCategory);
    return category;
  }

  static async update(id: number, processCategory: ProcessCategory): Promise<Category> {
    const {data: category} = await Axios.patch<Category>(`${this.URL}/${id}`, processCategory);
    return category;
  }

  static async delete(id: number | string): Promise<Category> {
    const {data: category} = await Axios.delete<Category>(`${this.URL}/${id}`);
    return category;
  }

}
