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

const deletePost = async (id: string): Promise<iPost[]> => {
  const response = await axios({
    url: `${BACKEND_URL}/posts/delete/${id}`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
  });
  return await response.data;
};

export default function useDeletePost(id: string) {
  return useQuery({
    queryKey: ['deletePost', id],
    queryFn: () => deletePost(id),
    enabled: false,
    retry: false,
  });
}
