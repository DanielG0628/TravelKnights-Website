import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Alert, SpeedDialIcon } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const theme = createTheme();

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
      }}
    />
  );
  const navigate = useNavigate();
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 3,
              color: "white",
              bgcolor: "black",
              width: 66,
              height: 66,
              fontSize: 54,
            }}
          >
            <LockOutlined fontSize="70px" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Typography
            component="h1"
            variant="body2"
            align="center"
            sx={{ m: 3 }}
          >
            Enter your email and we’ll send you a link to reset your password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: 500, textTransform: "none" }}
              onClick={handleClickOpen}
            >
              Send password reset email
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              onBackdropClick="false"
              PaperProps={{ sx: { bottom: 350 } }}
            >
              <DialogContent>
                <DialogContentText variant="h5" sx={{ mb: 3 }}>
                  We have sent you a one time password reset code to the email
                  provided. Please enter a new password
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="resetcode"
                  label="Enter 6-digit password reset code"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="newpass"
                  label="New password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="newpassconfirm"
                  label="Re-enter password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Reset Password</Button>
              </DialogActions>
            </Dialog>

            <Grid container sx={{ mt: 3, mb: 3 }}>
              <Grid item xs={5} sm={5} md={5}>
                <ColoredLine color="#666666" />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography color="#666666">OR</Typography>
                </Box>
              </Grid>
              <Grid item xs={5} sm={5} md={5}>
                <ColoredLine color="#666666" />
              </Grid>
            </Grid>
            <Grid container></Grid>
            <Button
              href="SignUp"
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2, width: 500, textTransform: "none" }}
            >
              Create new account
            </Button>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Link href="/" variant="body2" sx={{ mt: 3 }}>
                back to login
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
