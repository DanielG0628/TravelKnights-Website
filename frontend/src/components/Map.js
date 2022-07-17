import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import usa from '../map/usaHigh.svg';
import logo from '../images/logo.png';
import { ReactComponent as Svg } from '../map/usaHigh.svg';
const theme = createTheme();

const Map = () => (
  <div>
    <h1>THIS IS THE MAP</h1>
    <Svg overflow='visible' />
  </div>
);
export default Map;
