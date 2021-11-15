import {Image} from "types/image";

export function getSparePartImageUrl(image: Image | null | undefined): string {
  if (image && image.uri) {
    return `${process.env.API_URL + image.uri}`;
  }
  return '/product.png';
}
