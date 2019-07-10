import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppContext from '../context';
import './footer.scss';
import Logo from '../assets/shart-64x64.png';

const useStyles = makeStyles(theme => ({
  copyright: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '32px 32px',
    height: '32px',
    paddingLeft: '42px',
    textAlign: 'left',
    lineHeight: '32px',
    marginTop: '15px'
  }
}));

const Footer = () => {
  const classes = useStyles();
  const {} = useContext(AppContext);

  return (
    <footer className="footer">
      <Container className="footer-wrapper">
        <Divider />
        <Typography color="textSecondary" className={classes.copyright}>SHART &copy; 2019</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
