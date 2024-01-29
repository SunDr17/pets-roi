import { AxiosResponse } from 'axios';

export interface ApiResponse {
  data: AxiosResponse | null,
  error: string | null;
  response?: AxiosResponse | null,
}

export enum ErrorCodes {
  UnAuthorized = 'UnAuthorized',
}
