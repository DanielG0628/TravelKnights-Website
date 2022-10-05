/*
  FIXME:
  1. Scaling for sign in
  2. Red outline for empty inputs
  3. Do not allow leading/trailing space input for text fields
*/
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import ri from '../images/randomimage';
import Logo from '../images/logo.png';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/posts';
import { createUser2 } from '../actions/posts';

const theme = createTheme();
var response = 'A';
export default function SignInSide() {
  var changeThis = document.getElementsByClassName('loginresponse');

  const dispatch = useDispatch();

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    const googuser = { email: '', password: '' };

    googuser.email = userObject.email;
    googuser.password = userObject?.sub;
    googuser.name = userObject.name;
    googuser.emailVerified = true;

    dispatchGoogle(googuser);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '527171615531-lir17eijsj2fi41toef1ro3gauenpdnh.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      alignItems: 'center',
      width: 400,
    });
  });

  const randomImage = ri[Math.floor(Math.random() * (ri.length - 1))];
  const navigate = useNavigate();
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );

  const dispatchGoogle = async (googuser) => {
    await dispatch(getUser(googuser));
    const checkuser = await JSON.parse(localStorage.getItem('profile'));

    console.log(checkuser.payload);
    if (checkuser.payload.user == null) {
      await dispatch(createUser2(googuser));
      await dispatch(getUser(googuser));
      const checkuser2 = await JSON.parse(localStorage.getItem('profile'));

      if (checkuser2.payload.user != null) {
        navigate('/Map');
      }
    } else {
      navigate('/Map');
    }
  };

  const dispatchFunction = async (newuser) => {
    await dispatch(getUser(newuser));
    const checkuser = await JSON.parse(localStorage.getItem('profile'));

    // User exists successful login
    if (checkuser.payload.user) {
      navigate('/Map');
    }
    // User does not exist
    else {
      response = checkuser.payload;
      changeThis[0].innerHTML = response;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newuser = { email: '', password: '' };

    newuser.email = data.get('email').trim();
    newuser.password = data.get('password').trim();

    // Got rid of check for empty email/password for dispatch
    dispatchFunction(newuser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          sx={{ backgroundColor: '#f8f4e3' }}
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: '#f8f4e3',
                width: 120,
                height: 120,
                fontSize: 70,
              }}
            >
              <img src={Logo} alt='Logo' height='70' />
            </Avatar>

            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />

              <Box
                sx={{
                  marginTop: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  style={{ color: 'red' }}
                  justify='center'
                  align='center'
                  sx={{ mt: 0, mb: 0 }}
                  className='loginresponse'
                ></Typography>
              </Box>
              <Button
                style={{ backgroundColor: '#65743A' }}
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href='Forgot' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='SignUp' variant='body2'>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 3, mb: 3 }}>
                <Grid item xs={5} sm={5} md={5}>
                  <ColoredLine color='#666666' />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Typography color='#666666'>OR</Typography>
                  </Box>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <ColoredLine color='#666666' />
                </Grid>
              </Grid>
              <Grid
                container
                display='flex'
                style={{ alignItems: 'center' }}
                justifyContent='center'
              >
                <div
                  justify='center'
                  style={{ alignItems: 'center' }}
                  id='signInDiv'
                  data-width='328'
                ></div>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
