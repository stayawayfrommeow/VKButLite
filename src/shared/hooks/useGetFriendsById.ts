import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUpdateMe, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const getFriends = async (id: string): Promise<iUser> => {
  const response = await axios({
    url: `${BACKEND_URL}/users/friends/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
  });
  return await response.data;
};

export default function useGetFriendsById(id: string) {
  return useQuery({
    queryKey: ['getFriends', id],
    queryFn: () => getFriends(id),
    enabled: false,
    retry: false,
  });
}
