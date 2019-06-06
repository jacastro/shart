import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
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
  const { toggleDrawer } = useContext(AppContext);

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link className={classes.homeBtn} href="/">SHART</Link>
        </Typography>
        <Button className={classes.login} color="inherit">
          <Typography>Iniciar Sesión</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
