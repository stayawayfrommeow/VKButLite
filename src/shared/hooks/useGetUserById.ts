import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const getUserById = async (id: string): Promise<iUser> => {
  const response = await axios({
    url: `${BACKEND_URL}/users/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
  });
  return await response.data;
};

export default function useLogin(id: string) {
  return useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => getUserById(id),
    enabled: false,
    retry: false,
  });
}
