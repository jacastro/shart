import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

import './header.scss';
import AppContext from '../context';
import Logo from '../assets/shart-64x64.png';

const useStyles = makeStyles(theme => ({
  login: {
    float: 'right'
  },
  title: {
    color: '#FFF',
    textAlign: 'left',
    flexGrow: 1
  },
  homeBtn: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '32px 32px',
    display: 'inline-block',
    height: '32px',
    marginLeft: '10px',
    paddingLeft: '42px'
  }
}));

const Header = () => {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const { user, toggleDrawer } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    removeCookie('userId', { path: '/' });
    location.href = '/';
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.homeBtn} to="/">SHART</Link>
        </Typography>
        {user && (
          <React.Fragment>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={open}
              onClose={handleClose}
            >
              <Link to="/me"><MenuItem>{`Perfil de ${user.user_name}`}</MenuItem></Link>
              <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
