import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import './header.scss';
import AppContext from '../context';
import Logo from '../assets/shart-64x64.png';

const useStyles = makeStyles(theme => ({
  hLogo: {
    marginRight: 10,
    width: 32,
    height: 32
  },
  login: {
    float: 'right'
  },
  title: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '32px 32px',
    color: '#FFF',
    paddingLeft: '42px',
    textAlign: 'left',
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  const { toggleDrawer } = useContext(AppContext);

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography pl={10} variant="h6" className={classes.title}>
          SHART
        </Typography>
        <Button className={classes.login} color="inherit">
          <Typography>Iniciar Sesión</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
