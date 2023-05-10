import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';
import style from './createPost.module.scss';
import { createPostDefault } from '../../../mock';
import { Controller, useForm, useWatch } from 'react-hook-form';
import useUploadFile from '../../../hooks/useUploadFile';
import { useDropzone } from 'react-dropzone';
import useCreatePost from '../../../hooks/useCreatePost';
import { iCreatePost } from '../../../interfaces';
import { BACKEND_URL } from '../../../constants';

interface iProps {
  refetchCallback: () => void;
}

export default function CreatePost({ refetchCallback }: iProps) {
  const { control, setValue, reset } = useForm({
    defaultValues: createPostDefault,
  });
  const data = useWatch({ control: control });
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string>('');
  const uploadQuery = useUploadFile(file as File);
  const isFirstRender = useRef(true);
  const handleDrop = (file: File[]) => {
    setFile(file[0]);
  };
  const dropzone = useDropzone({ onDrop: handleDrop });
  const postQuery = useCreatePost(data as iCreatePost);

  const handleDelete = () => {
    setFile(null);
    setFileURL('');
  };

  const handleCreate = () => {
    postQuery.refetch().then((res) => {
      if (res.isSuccess) {
        reset();
        handleDelete();
        refetchCallback();
      }
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (file) {
      uploadQuery.refetch().then((res) => {
        setFileURL(res.data?.path as string);
      });
    }
  }, [file]);

  useEffect(() => {
    setValue('attach', fileURL);
  }, [fileURL]);

  return (
    <div className={style.root}>
      <div className={style.top}>
        <Controller
          render={({ field }) => (
            <TextField
              id='outlined-basic'
              label='title'
              variant='outlined'
              size='small'
              {...field}
            />
          )}
          name='title'
          control={control}
        />
        <div className={style.buttons}>
          {!fileURL && (
            <Button variant='outlined' onClick={() => dropzone.open()}>
              attach
            </Button>
          )}
          {fileURL && (
            <Button
              variant='outlined'
              color='error'
              onClick={() => handleDelete()}
            >
              delete attachment
            </Button>
          )}

          <Button variant='outlined' onClick={() => handleCreate()}>
            send
          </Button>
        </div>
      </div>
      <Controller
        render={({ field }) => (
          <TextField
            id='outlined-basic'
            label='text'
            variant='outlined'
            size='small'
            {...field}
            multiline
          />
        )}
        name='text'
        control={control}
      />
      {fileURL && (
        <>
          <img src={`${BACKEND_URL}/${fileURL}`} className={style.pic} />
          <span>{file?.name}</span>
        </>
      )}

      <Controller
        render={({ field }) => (
          <TextField
            id='attach'
            label='attach'
            variant='outlined'
            {...field}
            sx={{ display: 'none' }}
          />
        )}
        name='attach'
        control={control}
        defaultValue=''
      />
    </div>
  );
}
