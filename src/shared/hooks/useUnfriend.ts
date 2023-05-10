import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUpdateMe, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const unfriend = async (id: string): Promise<iUser> => {
  const response = await axios({
    url: `${BACKEND_URL}/users/unfriend`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
    data: { friendId: id },
  });
  return await response.data;
};

export default function useUnfriend(id: string) {
  return useQuery({
    queryKey: ['unfriend', id],
    queryFn: () => unfriend(id),
    enabled: false,
    retry: false,
  });
}
