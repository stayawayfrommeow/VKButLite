import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUser } from '../interfaces';
import Cookies from 'js-cookie';

const getMe = async (): Promise<iUser> => {
  const response = await axios({
    url: 'http://localhost:4000/users/me',
    method: 'get',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
  });
  return await response.data;
};

export default function useLogin() {
  return useQuery({
    queryKey: ['getMe'],
    queryFn: () => getMe(),
    enabled: false,
    retry: false,
  });
}
