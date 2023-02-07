import React from 'react';
// import { makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import { MenuIcon } from '@mui/icons-material/Menu';
// import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textAlign: 'left'
//   },
// }));

export default function NavBar() {
  // const classes = useStyles();
  // let history = useNavigate();

  return (
    <div
    // className={classes.root}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"
            // className={
            //   // classes.menuButton
            //   } 
            color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6"
          // className={classes.title}
          >
            Algo Helpr
          </Typography>
          <Button color="inherit"
          //   onClick={() => history.push("/dashboard")
          // }
          >Dashboard</Button>
          <Button color="inherit"
          // onClick={() => history.push("/logout")}
          >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}