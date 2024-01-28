import { AxiosResponse } from 'axios';

export interface ApiResponse {
  data: AxiosResponse | null,
  error: string | null;
}
