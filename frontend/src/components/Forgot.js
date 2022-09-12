/*
  1. Check if valid email format 
  2. Modal to confirm sent email
*/

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { resetPasswordSent } from '../actions/posts';
import { useDispatch } from 'react-redux';

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );

  const handleSubmit = (event) => {
    const user = { email: '' };
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email').trim(),
    });
    user.email = data.get('email').trim();

    dispatch(resetPasswordSent(user));
    console.log({
      email: data.get('email').trim(),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
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
          <Typography component='h1' variant='h5'>
            Forgot Password
          </Typography>
          <Typography
            component='h1'
            variant='body2'
            align='center'
            sx={{ m: 3 }}
          >
            Enter your email and we’ll send you a link to reset your password
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
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
              Send password reset email
            </Button>

            <Grid container sx={{ mt: 3, mb: 3 }}>
              <Grid item xs={5} sm={5} md={5}>
                <ColoredLine color='#666666' />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Typography color='#666666'>OR</Typography>
                </Box>
              </Grid>
              <Grid item xs={5} sm={5} md={5}>
                <ColoredLine color='#666666' />
              </Grid>
            </Grid>
            <Grid container></Grid>
            <Button
              style={{ backgroundColor: '#65743A' }}
              href='SignUp'
              type='submit'
              variant='contained'
              sx={{ mt: 1, mb: 2, width: 500, textTransform: 'none' }}
            >
              Create new account
            </Button>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Link href='/' variant='body2' sx={{ mt: 3 }}>
                back to login
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
