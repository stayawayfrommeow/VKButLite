import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUpdateMe, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const searchUsers = async (search: string): Promise<iUser> => {
  const response = await axios({
    url: `${BACKEND_URL}/users`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
    params: {
      search,
    },
  });
  return await response.data;
};

export default function useSearchUsers(search: string) {
  return useQuery({
    queryKey: ['updateMe', search],
    queryFn: () => searchUsers(search),
    enabled: false,
    retry: false,
  });
}
