import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUpdateMe, iUser } from '../interfaces';
import Cookies from 'js-cookie';

import { BACKEND_URL } from '../constants';

const befriend = async (id: string): Promise<iUser> => {
  const response = await axios({
    url: `${BACKEND_URL}/users/befriend`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
    data: { friendId: id },
  });
  return await response.data;
};

export default function usebefriend(id: string) {
  return useQuery({
    queryKey: ['befriend', id],
    queryFn: () => befriend(id),
    enabled: false,
    retry: false,
  });
}
