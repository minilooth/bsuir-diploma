import {Image} from "types/image";

export function getAvatarUrl(avatar: Image | null | undefined): string {
  if (avatar && avatar.uri) {
    return `${process.env.API_URL + avatar.uri}`;
  }
  return '/user.png';
}
