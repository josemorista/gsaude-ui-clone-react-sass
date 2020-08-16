import axios from 'axios';
import {serverURL} from '../../consts';
import {useMemo} from 'react';

const oapiInstance = axios.create({
  baseURL: `${serverURL}/oapi`,
});

const apiInstance = axios.create({
  baseURL: `${serverURL}/api`,
});


export const useApi = () => {
  const api = useMemo(() => apiInstance, []);
  
  return {api};
};

export const useOApi = () => {
  const oapi = useMemo(() => oapiInstance, []);
  
  return {oapi};
};

