import { axiosInstance } from 'apis';
import axios from 'axios';
export const getUserProfile = async () => {
  const { data } = await axiosInstance.get('/user');
  return data.data;
};
export const refreshAccessToken = async (token: string) => {
  const { data } = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/refresh-token', {
    refreshToken: token,
  });
  
  return data;
};
export const ExecLogin = async (
  email: string,
  password: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {

  console.log("data:", email, password)
  const { data } = await axios.post('http://localhost:3000/auth/login', {
    email,
    password,
  });
  console.log("data:1", data)
  return data;
};
