import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iPost, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const getPostsById = async (id: string): Promise<iPost[]> => {
  const response = await axios({
    url: `${BACKEND_URL}/posts/user/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
  });
  return await response.data.posts;
};

export default function useGetPostsById(id: string) {
  return useQuery({
    queryKey: ['getPostsById', id],
    queryFn: () => getPostsById(id),
    enabled: false,
    retry: false,
  });
}
