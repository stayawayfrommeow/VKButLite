import { Alert, Button, Dialog, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Controller, useForm, useWatch } from 'react-hook-form';
import style from '../userInfo.module.scss';
import useUploadFile from '../../hooks/useUploadFile';
import useUpdateMe from '../../hooks/useUpdateMe';
import { useUserCore } from '../../../core/Core';
import { iUpdateMe } from '../../interfaces';
import useGetMe from '../../hooks/useGetMe';
import { updateUserFormDefault } from '../../mock';
import { BACKEND_URL } from '../../constants';

interface iProps {
  open: boolean;
  handleClose: () => any;
  setToaster: React.Dispatch<React.SetStateAction<boolean>>;
}

const textFields = [
  'firstName',
  'secondName',
  'age',
  'city',
  'university',
] as const;

const noneFields = ['id', 'profileImage'] as const;

type iTextField = (typeof textFields)[number];
type iNoneField = (typeof noneFields)[number];

export default function UpdateUser({ open, handleClose, setToaster }: iProps) {
  const { user, setUser } = useUserCore();
  const { control, setValue } = useForm({
    defaultValues: updateUserFormDefault,
  });
  const data = useWatch({ control: control });
  const updateQuery = useUpdateMe(data as iUpdateMe);
  const meQuery = useGetMe();
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string>('');
  const uploadQuery = useUploadFile(file as File);
  const isFirstRender = useRef(true);

  const handleDrop = (file: File[]) => {
    setFile(file[0]);
  };
  const dropzone = useDropzone({ onDrop: handleDrop });

  const handleDelete = () => {
    setFile(null);
    setFileURL('');
  };

  useEffect(() => {
    user &&
      Object.entries(user).map((item) => {
        setValue(item[0] as iTextField, item[1] ? item[1] : '');
      });
  }, [user]);

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
    setValue('profileImage', fileURL);
  }, [fileURL]);

  const handleUpdate = () => {
    updateQuery.refetch();
    handleClose();
    meQuery.refetch().then((res) => {
      res.isSuccess ? setUser(res.data) : null;
      setToaster(true);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} disableScrollLock fullWidth>
      <div className={style.dialog}>
        <span>Please enter info you'd like to change</span>

        <form>
          {textFields.map((fieldName: iTextField) => (
            <Controller
              key={fieldName}
              render={({ field }) => (
                <TextField
                  id={fieldName}
                  label={fieldName}
                  variant='outlined'
                  {...field}
                />
              )}
              name={fieldName}
              control={control}
              defaultValue=''
            />
          ))}
          {noneFields.map((fieldName: iNoneField) => (
            <Controller
              key={fieldName}
              render={({ field }) => (
                <TextField
                  id={fieldName}
                  label={fieldName}
                  variant='outlined'
                  {...field}
                  sx={{ display: 'none' }}
                />
              )}
              name={fieldName}
              control={control}
              defaultValue=''
            />
          ))}

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
          {fileURL && (
            <>
              <img src={`${BACKEND_URL}/${fileURL}`} />
              <span>{file?.name}</span>
            </>
          )}
          <Button variant='outlined' onClick={() => handleUpdate()}>
            save changes
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
