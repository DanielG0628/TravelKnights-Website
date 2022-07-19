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
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactGoogleLogin, { GoogleLogin } from "react-google-login";
import jwt_decode from "jwt-decode";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import ri from "../images/randomimage";
import Logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/posts";
/*client ID: 718876170013-kfsdq4ttfda4gbr0h7fol2cvu79ipucp.apps.googleusercontent.com */
/*client secret: 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 */
/*NEW client ID: 527171615531-lir17eijsj2fi41toef1ro3gauenpdnh.apps.googleusercontent.com */
/*NEW client secret: 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 */
const theme = createTheme();

export default function SignInSide() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  console.log(user);

  function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);

    //console.log(userObject);
    const result = userObject;
    const token = userObject?.jti;
    //console.log("User Token: " + token); //jti is token

    setUser(userObject);
    try {
      dispatch({ type: "AUTH", data: { result } });
      navigate("/Map");
    } catch (error) {
      console.log(error);
    }
  }

  const SignInReg = (event) => {
    event.preventDefault();
    const user = new FormData(event.currentTarget);
    console.log({
      email: user.get("email"),
      password: user.get("password"),
    });
    //using user results in empty req.body
    const newuser = { email: "", password: "" };

    newuser.email = user.get("email");
    newuser.password = user.get("password");

    dispatch(getUser(newuser));
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "527171615531-lir17eijsj2fi41toef1ro3gauenpdnh.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
    });
  }, []);

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
        <Grid
          item
          sx={{ backgroundColor: "#f8f4e3" }}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#f8f4e3",
                width: 120,
                height: 120,
                fontSize: 70,
              }}
            >
              <img src={Logo} alt="Logo" height="70" />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
                style={{ backgroundColor: "#65743A" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={SignInReg}
              >
                Sign In
              </Button>

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
                  <div id="signInDiv"></div>
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <GithubLoginButton />
                </Grid>
                {user && (
                  <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                    <h3>{user.email}</h3>
                  </div>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
