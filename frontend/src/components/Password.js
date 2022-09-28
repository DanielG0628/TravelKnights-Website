import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { resetPassword } from '../actions/posts';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';

const theme = createTheme();

export default function Password() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = { email: '', password: '' };

    const temp = window.location.pathname;
    const correct = temp.replace('/Password/', '');

    user.password = data.get('password').trim();
    user.email = correct;

    setTimeout(() => {
      setTimeout(() => {
        dispatch(resetPassword(user));
      }, 2000);

      setTimeout(() => {}, 500);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          component='form'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <Avatar
            sx={{
              m: 3,
              color: 'white',
              bgcolor: 'black',
              width: 66,
              height: 66,
              fontSize: 54,
            }}
          >
            <LockOutlined fontSize='70px' />
          </Avatar>
          <Typography
            component='h1'
            variant='body2'
            align='center'
            sx={{ m: 3 }}
          >
            Enter a new password for your account
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='password'
                label='New Password'
                name='password'
                autoComplete='password'
                type='password'
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            style={{ backgroundColor: '#65743A' }}
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, width: 500, textTransform: 'none' }}
          >
            Set new password
          </Button>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Button
              href='/'
              style={{ backgroundColor: '#65743A' }}
              type='submit'
              variant='contained'
              sx={{ mt: 3, mb: 2, width: 500, textTransform: 'none' }}
            >
              back to login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
