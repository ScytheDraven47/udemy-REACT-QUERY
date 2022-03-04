import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { User } from '../../../shared/types';
import { baseUrl } from './constants';

type jwtHeader = Pick<AxiosRequestHeaders, 'Authorization'>;

export function getJWTHeader(user: User): jwtHeader {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
