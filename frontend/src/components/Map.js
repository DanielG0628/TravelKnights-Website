import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Svg } from "../map/usaHigh.svg";
import AppBar from "@mui/material/AppBar";
import { useDispatch } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import { CardActionArea} from "@mui/material";
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';






//we should see if onclick cant be called in a modal, if not, we need alot of && for all fields with id.
//or we can check if first three characters are US-

const theme = createTheme();
var htmlElement = "../map/usaHigh.svg";

/*
This is how I plan on sending mongo info to table.
const rows = [];
for (var j = 0; j < Trips.length; j++)
{
  for (var i = 0; i < Trips[j].cities.length; i++)
  {
    createData(Trips[j].cities[i].city, Trips[j].stateAbbrev, Trips[j].cities[i].memories)
  }
}
*/

//temp objects before info is sent This is proper format
//Everything involving Trips, most likely needs to be in useEffect.
const Trips = [
{
  stateAbbrev: "FL",
  cities: [
    {city: "Orlando", memories: [{date: "12/12/12", description: "desc.", image:"img"}]},
    {city: "Tampa", memories: [{date: "02/10/22", description: "desc.2", image:"img"}]}
  ]
},
{
  stateAbbrev: "GA",
  cities: [
    {city: "Atlanta", memories: [{date: "12/12/02", description: "desc.3", image:"img"}]}
  ]
},
];
var items = [];
var itemsnum = 0;

// We format List of Trips in this function.
function NameList() {
  if (itemsnum != 0) {
    return (
      
       //this is probably gonna go back to <ul> 
        items.map(name => <Card variant="outlined" style={{margin: "2px"}}><CardActionArea> <Typography level="body2">{name}</Typography></CardActionArea></Card>)
    );
  }
  else
    return(<h3>No Trips Found. Would you like to add one?</h3>);
}

export default function Map() {

  
  //useEffect needed to getElement without NULL result
 
  useEffect(() => {
 
    for(var i = 0; i < Trips.length; i++)
    {
      var STVisited = Trips[i].stateAbbrev;
      STVisited = "US-" + STVisited;
      var STCheck = document.getElementById(STVisited);
      STCheck.setAttribute("class", "visited");
      //Possibly add Trip Table code here.
    }

  }, []);

  function sayHello(el) {
    if (el.id.startsWith("US-")) {

      htmlElement = el.id;
      var ST = htmlElement.substring(htmlElement.length - 2); //We'd actually check the stateabbrev. object, see if we find it, then push all cities from there along with however we want to display memories.
      handleClickOpen();
      el.setAttribute("class", "visited");
      if (itemsnum != 0) {
      items = [];
      itemsnum = 0;
      }
      
        for (var i = 0; i < Trips.length; i++)
        {
          if (Trips[i].endsWith(ST)) {
            items.push(Trips[i]); //Array of Trips in FL
            itemsnum++;
    
          }
        }

      }
    }
  
 

  const [open, setOpen] = React.useState(false);
  const [open_editdel, setOpeneditdelete] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editdeleteOpen = () => {
    setOpeneditdelete(true);
  };

  const editdeleteClose = () => {
    setOpeneditdelete(false);
  };
  const openEditDelete = () => setOpeneditdelete(true);
  const openForm = () => setOpen(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [nav, setnav] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navMenu = (event) => {
    setnav(event.currentTarget);
  };

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navclose = () => {
    setnav(null);
  };

//This styles the modals
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#f8f4e3",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    minWidth: "480px"
  };
  
//After this line and before return is code solely for the table
function createData(cityname, state, datestarted, dateended, image) {
  return {
    cityname,
    state,
    datestarted,
    dateended,
    image,
    history: [
      {
        date: 'Jan. 15, 2021',
        customerId: 'According to all known laws of aviation, there is no way that a bee should be able to fly, its wings are too small to get its fat little body off ',
        amount: 3,
      },
      {
        date: '01/12/2020',
        customerId: 'According to all known laws of aviation, there is no way that a bee should be able to fly, its wings are too small to get its fat little body off2',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.cityname}
        </TableCell>
        <TableCell align="left">{row.state}</TableCell>
        <TableCell align="left">{row.datestarted}</TableCell>
        <TableCell align="left">{row.image}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Memories:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Description:</TableCell>
                    <TableCell align="center">Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">{historyRow.customerId}</TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//I'm sure this can be replaced
Row.propTypes = {
  row: PropTypes.shape({
    state: PropTypes.string.isRequired,
    datestarted: PropTypes.string.isRequired,
    dateended: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    cityname: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

//here we createData with the info from mongo
const rows = [
  createData("Orlando", "Florida", "10/12/2012", "10/14/2012", "Image"),
  createData("Kissimmee", "Florida", "09/12/2021", "10/10/2021", "Image2"),
  createData("Atlanta", "Florida", "10/12/2012", "10/14/2012", "Image3"),
  createData("New York", "New York", "12/24/2019", "12/29/2019", "Image4"),
  createData("Austin", "Texas", "10/19/2014", "10/22/2014", "Image5"),

];

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>City</TableCell>
            <TableCell align="left">State</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
//Code for Table End



  console.log(user);
  return (
    <div>
      <Box onClick={(element) => sayHello(element.target)}> 
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "#65743a" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={navMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Travel Knights
            </Typography>

            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              onClick={handleOpenUserMenu}
            >
              {user.payload.user.name}
            </Button>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={nav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(nav)}
              onClose={navclose}
            >
              <MenuItem onClick={handleClickOpen}>
                <Typography textAlign="center">Add Trip</Typography>
              </MenuItem>
              <MenuItem onClick={editdeleteOpen}>
                <Typography textAlign="center">Delete Trip</Typography>
              </MenuItem>
              <MenuItem onClick={Logout}>
                <Typography textAlign="center">Edit Trip</Typography>
              </MenuItem>
            </Menu>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={Logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Svg />
        <CollapsibleTable />
    <Modal
          
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Grid sx={style} xs="auto">
              <Typography
                sx={{ mb: 3 }}
                textAlign="center"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Here are your trips from Florida!
              </Typography>

            <NameList/>

              <Typography
                id="transition-modal-description"
                textAlign="center"
                sx={{ mt: 2 }}
              >
                Your trip to City, {htmlElement}. Edit? Delete?
              </Typography>
              <Button onClick={openForm}>Add trip</Button>
              <Box type="form" open={open}>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Would you like to add a trip to {htmlElement}?
                </Typography>
                <Grid item xs={12} md={10} padding="10px">
                  <TextField
                    id="state"
                    name="state"
                    label="State Name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} md={10} sx={{ mx: "10px" }}>
                  <TextField
                    padding="10px"
                    id="name"
                    name="name"
                    label="ButtonWillOpenBothForm"
                    type="text"
                  />
                </Grid>
              </Box>
            </Grid>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open_editdel}
          onClose={editdeleteClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open_editdel}>
            <Box sx={style}>
              <Typography
                textAlign="center"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Your Trips
              </Typography>

              <Typography
                id="transition-modal-description"
                textAlign="center"
                sx={{ mt: 2 }}
              ></Typography>
              <Button onClick={openForm}>Delete Trip</Button>
              <Button onClick={openForm}>Edit Trip</Button>
              <Box type="form" open={open}>
                <Grid item xs={12} md={10} padding="10px">
                  <TextField
                    id="state"
                    name="state"
                    label="State Name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} md={10} sx={{ mx: "10px" }}>
                  <TextField
                    padding="10px"
                    id="name"
                    name="name"
                    label="ButtonWillOpenBothForm"
                    type="text"
                  />
                </Grid>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    
    </div>
  );
}
