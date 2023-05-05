import { Button, Switch, TextField } from '@mui/material';
import style from './login.module.scss';

export default function Login() {
  const label = { inputProps: { 'aria-label': 'register switch' } };

  return (
    <div className={style.root}>
      <span>welcome to VKButLite</span>
      <div className={style.login}>
        <span>please login</span>
        <div className={style.fields}>
          <TextField id='outlined-basic' label='Login' variant='outlined' />
          <TextField id='outlined-basic' label='Password' variant='outlined' />
        </div>
        <div className={style.register}>
          <Button variant='outlined'>login</Button>
          <div>
            <span>i'm new, register me</span>
            <Switch {...label} color={'primary'} />
          </div>
        </div>
      </div>
    </div>
  );
}
