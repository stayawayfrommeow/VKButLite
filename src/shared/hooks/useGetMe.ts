import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const getMe = async (): Promise<iUser> => {
  const response = await axios({
    url: `${BACKEND_URL}/users/me`,
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
