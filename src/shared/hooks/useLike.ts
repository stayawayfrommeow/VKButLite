import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  iCreatePost,
  iLogin,
  iLoginResponse,
  iPost,
  iUpdateMe,
  iUser,
} from '../interfaces';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../constants';

const likePost = async (id: string): Promise<iPost[]> => {
  const response = await axios({
    url: `${BACKEND_URL}/posts/like/${id}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
  });
  return await response.data;
};

export default function useLike(id: string) {
  return useQuery({
    queryKey: ['likePost', id],
    queryFn: () => likePost(id),
    enabled: false,
    retry: false,
  });
}
