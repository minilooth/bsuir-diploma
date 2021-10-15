import axios, {AxiosError} from "axios";

const DEFAULT_CONFIG = {
  baseURL: `${process.env.API_URL}/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const Axios = axios.create({...DEFAULT_CONFIG});
export const isAxiosError = (err: unknown) => axios.isAxiosError(err);

export const getAxiosErrorData = (err: unknown): string => {
  if (isAxiosError(err)) {
    return (err as AxiosError).response?.data.message;
  }
  else {
    return (err as Error).message;
  }
}
