import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iRegisterResponse } from '../interfaces';
import { BACKEND_URL } from '../constants';

const registerUser = async (data: iLogin): Promise<iRegisterResponse> => {
  const response = await axios({
    url: `${BACKEND_URL}/auth/register`,
    method: 'post',
    data: {
      login: data.login,
      password: data.password,
    },
  });
  return response.data;
};

export default function useRegister(data: iLogin) {
  return useQuery({
    queryKey: ['register', data],
    queryFn: () => registerUser(data),
    enabled: false,
    retry: false,
  });
}
