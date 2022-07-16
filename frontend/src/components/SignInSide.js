import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactGoogleLogin, { GoogleLogin } from "react-google-login";

import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import ri from "../images/randomimage";
import Logo from "../images/logo.png";

const theme = createTheme();

export default function SignInSide() {
  const randomImage = ri[Math.floor(Math.random() * ri.length)];
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
  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = (googleData) => {
    alert(googleData);
  };
  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${randomImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "white",
                width: 120,
                height: 120,
                fontSize: 70,
              }}
            >
              <img src={Logo} alt="Logo" height="70" />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Avatar>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              {/*
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                fullwidth
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={"single_host_origin"}
                sx={{ mt: 3, mb: 2 }}
              />
          */}

              {/*
                <GitHubLogin
                  clientId={process.env.ReactGitHubLogin}
                  fullwidth
                  buttonText="Log in with GitHub"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  sx={{ mt: 3, mb: 2 }}
                >

                </GitHubLogin>
              */}

              <Grid container>
                <Grid item xs>
                  <Link href="Forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="SignUp" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 3, mb: 3 }}>
                <Grid item xs={5} sm={5} md={5}>
                  <ColoredLine color="#666666" />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography color="#666666">OR</Typography>
                  </Box>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  <ColoredLine color="#666666" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                  <GoogleLoginButton />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <GithubLoginButton />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
