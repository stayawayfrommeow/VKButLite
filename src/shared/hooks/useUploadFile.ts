import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  iFileResponse,
  iLogin,
  iLoginResponse,
  iRegisterResponse,
} from '../interfaces';

const uploadFile = async (file: File): Promise<iFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios({
    url: 'http://localhost:4000/files',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default function useUploadFile(file: File) {
  return useQuery({
    queryKey: ['uploadFile', file],
    queryFn: () => uploadFile(file),
    enabled: false,
    retry: false,
  });
}
