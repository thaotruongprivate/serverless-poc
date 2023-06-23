import { BULLFINCH_API_URI, BULLFINCH_API_VERSION } from '../constants/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getBullfinchAuthToken } from '../services/getBullfinchAuthToken';

export const getBullfinchUrl = (domain: string, id: string|null = null) => {
  return BULLFINCH_API_URI + '/' + domain + '/' + BULLFINCH_API_VERSION + '/' + id;
}

export const makeBullfinchRequest = async <T>(url: string, method: string = 'GET', data: Object | null = null) => {
  const config: AxiosRequestConfig = {
    method,
    headers: {
      Authorization: 'Bearer ' + await getBullfinchAuthToken(),
    }
  };
  if (data) {
    config.data = data;
  }
  return await axios<Object, AxiosResponse<T>>(url, config);
}