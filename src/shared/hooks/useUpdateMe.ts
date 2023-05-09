import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { iLogin, iLoginResponse, iUpdateMe, iUser } from '../interfaces';
import Cookies from 'js-cookie';

const updateMe = async (data: iUpdateMe): Promise<iUser> => {
  const prettyData = {
    age: data.age ? data.age : null,
    city: data.city ? data.city : null,
    firstName: data.firstName ? data.firstName : null,
    id: data.id ? data.id : null,
    profileImage: data.profileImage ? data.profileImage : null,
    secondName: data.secondName ? data.secondName : null,
    university: data.university ? data.university : null,
  };

  const response = await axios({
    url: `http://localhost:4000/users`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('_token')}`,
    },
    data: prettyData,
  });
  return await response.data;
};

export default function useUpdateMe(data: iUpdateMe) {
  return useQuery({
    queryKey: ['updateMe', data],
    queryFn: () => updateMe(data),
    enabled: false,
    retry: false,
  });
}
