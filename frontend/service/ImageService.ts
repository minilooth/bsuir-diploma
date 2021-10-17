import {Image} from "types/image";
import {Axios} from "core/axios";

enum ImageServiceRoutes {
  UPLOAD = '/upload'
}

export class ImageService {

  private static readonly URL = '/image'

  static async upload(form: FormData): Promise<Image> {
    const {data} = await Axios.post<Image>(`${this.URL}${ImageServiceRoutes.UPLOAD.toString()}`, form,
      {headers: {"Content-Type": "multipart/form-data"}});
    return data;
  }
}
