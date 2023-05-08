import { Alert, Button, Snackbar, Switch, TextField } from '@mui/material';
import style from './login.module.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { iLogin, iLoginResponse } from '../../shared/interfaces';
import useLogin from '../../shared/hooks/useLogin';
import useRegister from '../../shared/hooks/useRegister';
import Cookies from 'js-cookie';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useUser } from '../../shared/hooks/useUser';
import { useEffect, useState } from 'react';

export default function Login() {
  const label = { inputProps: { 'aria-label': 'register switch' } };
  const { user, setUser } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { control, setValue } = useForm({
    defaultValues: {
      login: '',
      password: '',
      register: false,
    },
  });
  const [open, setOpen] = useState(false);
  const data = useWatch({ control: control });
  const loginQuery = useLogin(data as iLogin);
  const registerQuery = useRegister(data as iLogin);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (data.register) {
      const res = await registerQuery.refetch();
      if (res.isSuccess) {
        Cookies.set('_token', res.data.token);
        setValue('register', false);
        setOpen(true);
      }
    } else {
      const res = await loginQuery.refetch();
      if (res.isSuccess) {
        Cookies.set('_token', res.data.token);
        setUser(res.data.user);
        navigate('/profile');
      }
    }
  };

  // const registerQuery = useQuery({
  //   queryKey: ['register'],
  //   queryFn: () => registerUser(),
  // });

  return (
    <div className={style.root}>
      <span>welcome to VKButLite</span>
      <div className={style.login}>
        <form>
          <span>please login</span>
          <div className={style.fields}>
            <Controller
              render={({ field }) => (
                <TextField
                  id='outlined-basic'
                  label='Login'
                  variant='outlined'
                  {...field}
                />
              )}
              name='login'
              control={control}
              defaultValue=''
            />
            <Controller
              render={({ field }) => (
                <TextField
                  id='outlined-basic'
                  label='Password'
                  variant='outlined'
                  {...field}
                />
              )}
              name='password'
              control={control}
              defaultValue=''
            />
          </div>
          <div className={style.register}>
            <Button variant='outlined' onClick={() => handleSubmit()}>
              login
            </Button>
            <div>
              <span>i'm new, register me</span>
              <Controller
                render={({ field }) => (
                  <Switch
                    {...label}
                    color={'primary'}
                    {...field}
                    inputProps={{ 'aria-label': 'controlled' }}
                    checked={field.value}
                  />
                )}
                name='register'
                control={control}
                defaultValue={false}
              />
            </div>
          </div>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          User registered - please login
        </Alert>
      </Snackbar>
    </div>
  );
}
