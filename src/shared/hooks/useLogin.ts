import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse } from '../interfaces';
import { BACKEND_URL } from '../constants';

const loginUser = async (data: iLogin): Promise<iLoginResponse> => {
  const response = await axios({
    url: `${BACKEND_URL}/auth/login`,
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
