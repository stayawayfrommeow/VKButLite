import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse } from '../interfaces';

const loginUser = async (data: iLogin): Promise<iLoginResponse> => {
  const response = await axios({
    url: 'http://localhost:4000/auth/login',
    method: 'post',
    data: {
      login: data.login,
      password: data.password,
    },
  });
  return await response.data;
};

export default function useLogin(data: iLogin) {
  return useQuery({
    queryKey: ['login', data],
    queryFn: () => loginUser(data),
    enabled: false,
    retry: false,
  });
}
