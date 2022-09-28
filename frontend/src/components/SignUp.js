/*
  1. Only submit on valid input fields
  2. Red outlines for missing input fields
  3. Better modal for confirmation on submit
*/
import Input from "@mui/material/Input";

import React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { alpha, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../images/logo.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { createUser } from '../actions/posts';
import { $CombinedState } from "redux";

const theme = createTheme();
export default function SignUp() {
  var changeThis = document.getElementsByClassName('signupresponse');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData(event.currentTarget);
    console.log(event.currentTarget.email);
    //using user results in empty req.body
    const newuser = { name: '', email: '', phone: '', password: '' };
    newuser.name = user.get('name').trim();
    newuser.email = user.get('email').trim();
    newuser.password = user.get('password').trim();
    newuser.confirmPassword = user.get('confirmpassword').trim();
    var invalidInput = false;

   
 
    if(newuser.name.length === 0)
    {
      changeThis[0].innerHTML = '*Please Enter all Input Fields*';
      invalidInput = true;  
      const el = document.getElementById("name");
      el.required = "required";
      var label = document.querySelector('label[for="name"]');
      label.textContent = "Full Name*";
    }
    if(newuser.confirmPassword.length === 0 || newuser.password.length === 0 || newuser.email.length === 0 || newuser.name.length === 0) {
      changeThis[0].innerHTML = '*Please Enter all Input Fields*';
      invalidInput = true;  
    }
    else {
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      if(!regexExp.test(newuser.email))
      {
        changeThis[0].innerHTML = '*Invalid Email*'
        invalidInput = true;
      }
    }
    if (newuser.password === user.get('confirmpassword').trim()) {
      if (invalidInput == false) {
      dispatch(createUser(newuser));
       changeThis[0].innerHTML = '';
      
      handleClickOpen();
      }
    } else {
      changeThis[0].innerHTML = '*Passwords do not match*';
    }
  };

  /* const ValidationTextField = styled(TextField)({
    '& input:empty + fieldset': {
      borderColor: 'grey'
    },
    '& input:valid + fieldset': {
      borderColor: 'green'
    },
    '& input:invalid:not(:focus):not(:placeholder-shown) + fieldset': {
      borderColor: 'red'
    },
    '& input:valid:focus + fieldset':{
      borderLeftWidth: 3,
      padding: '4px !important',
    },
  });
*/
const ValidationTextField = styled(TextField)({
  '& input:valid:placeholder-shown + fieldset': {
    borderColor: 'grey'
  },
  '& input:valid:not(:placeholder-shown) + fieldset': {
    borderColor: 'green'
  },
  '& input:empty + fieldset': {
    borderColor: 'red'
  },
  '& input:valid:focus + fieldset':{
    borderLeftWidth: 3,
    padding: '4px !important',
  },
});



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
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ValidationTextField
                  name='name'
                  fullWidth
                  id='name'
                  label='Full Name'
                  autoFocus
                  placeholder=" "
                  variant="outlined"
                  />
              </Grid>

              <Grid item xs={12}>
                <ValidationTextField
                  
                  fullWidth
                  id='email'
                  type="email"
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  placeholder=" "
                  
                />
              </Grid>
              <Grid item xs={12}>
                <ValidationTextField
                  
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  placeholder=" "
                />
              </Grid>
              <Grid item xs={12}>
                <ValidationTextField
                  
                  fullWidth
                  name='confirmpassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmpassword'
                  autoComplete='new-password'
                  placeholder=" "
                />
              </Grid>
            </Grid>
            <Button
              style={{ backgroundColor: '#65743A' }}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              //onClick={handleClickOpen}
            >
              Sign Up
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              onBackdropClick={false}
              PaperProps={{ sx: { bottom: 200 } }}
            >
              <DialogContent>
                <DialogContentText component='h1' variant='h5'>
                  We have sent you a link to the email provided. Please check
                  you email to finish setting up your account
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>OK</Button>
              </DialogActions>
            </Dialog>

            <Box display='flex' justifyContent='center' alignItems='center'>
              <Link href='/' variant='body2' sx={{ mt: 3 }}>
                Already have an account? Sign in
              </Link>
            </Box>
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
                justifyContent='center'
                align='center'
                sx={{ mt: 0, mb: 0 }}
                className='signupresponse'
              ></Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
