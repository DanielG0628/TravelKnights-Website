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
import usa from "../map/usaHigh.svg";
import logo from "../images/logo.png";
import { ReactComponent as Svg } from "../map/usaHigh.svg";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const theme = createTheme();
var htmlElement = "";

export default function Map() {
  function sayHello(el) {
    if (el.id != "")
    {
      handleClickOpen();
      htmlElement = el.id;
el.setAttribute("class", "visited");
    }
  }
  
  const [open, setOpen] = React.useState(false);
  
   const handleClickOpen = () => {
     setOpen(true);
   };
  
   const handleClose = () => {
     setOpen(false);
   };
   
 
  return( 
  <Box onClick={(element) => sayHello(element.target)}>

    <h1>THIS IS THE MAP</h1>
    <Svg />

<Dialog
 open={open}
 onClose={handleClose}
PaperProps={{ sx: { bottom: 350 } }}
>
<DialogContent>
  <DialogContentText>
    Welcome to the United States! {htmlElement}
  </DialogContentText>
</DialogContent>
</Dialog>
</Box>
 )

}