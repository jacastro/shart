import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Logo from '../../assets/shart-icon.png';
import { get } from '../../services';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [cookies, setCookie] = useCookies(['userId']);

  const login = () => {
    setError(null);
    setLoading(true);
    get('/users', { email })
      .then(({ data }) => {
        const [user] = data.users;
        if (user && password === '123') {
          setCookie('userId', user.id, { path: '/' });
          location.reload();
        } else {
          setLoading(false);
          setError('Tu usuario o contraseña no son correctas');
        }
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div id="welcome">
            <Typography variant="h1">
              <img src={Logo} width={70} height={70} alt="Shart Logo" className="mr15px" />
              SHART
            </Typography>
            <p>
              <Typography>SHARE YOUR ART</Typography>
            </p>
          </div>
          <div id="loginForm">
            <Typography component="h2" variant="h5">
              <LockOutlinedIcon color="secondary" className="mr5px txtTop" />
              Iniciar Sesión
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              {loading ? <CircularProgress /> : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => login()}
                >
                  Ingresar al Sitio
                </Button>
              )}
              {error && <Typography color="textSecondary" gutterBottom>{error}</Typography>}
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
