import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AppContext from '../context';

import './header.scss';

const Header = () => {
  const { toggleDrawer } = useContext(AppContext);

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="header_title">
          Shart
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
