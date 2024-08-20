import { axiosInstance } from 'apis';
import { removeAccessToken, removeRefreshToken } from './localStorage';
export const fetcher = (url: string, token: string) => {
    if (url) {
      return axiosInstance
        .get(url, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => {    
          return res.data
        })
    }
  };
  export const fetcherWithMethodPost = (url: string, data: any, token: string) => {

    if (url) {
      return axiosInstance
        .post(url, data, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => res);
    }
  };
  