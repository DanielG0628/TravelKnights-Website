import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { verifyEmail } from '../actions/posts';
import { useDispatch } from 'react-redux';
const theme = createTheme();

export default function Verified() {
  const dispatch = useDispatch();

  const [setOpen] = React.useState(false);
  const temp = window.location.pathname;
  const user = { email: '' };
  const correct = temp.replace('/Verified/', '');

  user.email = correct;

  setTimeout(() => {
    setTimeout(() => {
      dispatch(verifyEmail(user));
    }, 1000);

    setTimeout(() => {}, 500);
  }, 1000);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            <MarkEmailReadIcon fontSize='70px' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Email Verified
          </Typography>
          <Typography
            component='h1'
            variant='body2'
            align='center'
            sx={{ m: 3 }}
          >
            Please use the link below to sign in to your account
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Button
              style={{ backgroundColor: '#65743A' }}
              type='submit'
              variant='contained'
              href='/'
              sx={{
                mt: 3,
                mb: 2,
                height: 50,
                width: 500,
                textTransform: 'none',
              }}
              onClick={handleClickOpen}
            >
              Go to Sign In page
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
