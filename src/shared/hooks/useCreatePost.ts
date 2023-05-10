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

const createPost = async (data: iCreatePost): Promise<iPost> => {
  const prettyData = {
    text: data.text ? data.text : null,
    title: data.title ? data.title : null,
    attachment: data.attach ? data.attach : null,
  };

  const response = await axios({
    url: `${BACKEND_URL}/posts`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
    data: prettyData,
  });
  return await response.data;
};

export default function useCreatePost(data: iCreatePost) {
  return useQuery({
    queryKey: ['createPost', data],
    queryFn: () => createPost(data),
    enabled: false,
    retry: false,
  });
}
