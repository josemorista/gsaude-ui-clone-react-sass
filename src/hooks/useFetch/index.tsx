import useSWR, {ConfigInterface} from 'swr';
import {AxiosRequestConfig} from 'axios';
import {useApi, useOApi} from '../useApi';

export const useFetch = <T extends unknown>(url : string, config : AxiosRequestConfig = {}, options : ConfigInterface = {revalidateOnFocus: false}) => {
  const {api} = useApi();
  const {data, error, mutate, revalidate} = useSWR<T>(url, async url => {
    const {data} = await api.get(url, config);
    return data;
  },options);

  return {data, error, mutate, revalidate};
};

export const useOpenFetch = <T extends unknown>(url : string, config : AxiosRequestConfig = {}, options : ConfigInterface = {revalidateOnFocus: false}) => {
  const {oapi} = useOApi();
  const {data, error, mutate, revalidate} = useSWR<T>(url, async url => {
    const {data} = await oapi.get(url, config);
    return data;
  },options);

  return {data, error, mutate, revalidate};
};
