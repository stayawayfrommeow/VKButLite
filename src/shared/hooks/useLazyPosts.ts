import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iPost, iUser } from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const getLazyPosts = async (cursor: number): Promise<iPost[]> => {
  const response = await axios({
    url: `${BACKEND_URL}/posts/feed`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
    params: {
      cursor: cursor,
    },
  });
  return await response.data;
};

export default function useLazyPosts(cursor: number) {
  return useInfiniteQuery({
    queryKey: ['lazyPosts', cursor],
    queryFn: () => getLazyPosts(cursor),
    enabled: false,
    retry: false,
  });
}
