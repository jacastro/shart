import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { React } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
    height: 100,
    width: 100,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  removeCookie('userId', { path: '/' });
  location.reload();
};

const Profile = ({ me, email, user_name, myProfile }) => {
  const classes = useStyles();
  console.log(me, email, user_name);
  const [values, setValues] = React.useState({
    name: 'Nombre',
    age: ''
  });

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <React.Fragment>
      <Grid container>
        <Avatar className={classes.purpleAvatar}>{user_name}</Avatar>
      </Grid>
      <div style={{ textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom>
			Acerca
        </Typography>
        <Grid>
          <TextField
            id="standard-name"
            label="Nombre"
            disabled
            className={classes.textField}
            value={me.full_name}
            onChange={handleChange('name')}
            margin="normal"
						/>
          <TextField
            id="standard-uncontrolled"
            label="Biografia"
            disabled
            value={me.biography}
            className={classes.textField}
            margin="normal"
						/>
        </Grid>
      </div>
      <div style={{ textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom>
					Datos de contacto
        </Typography>
        <Grid value="Datos de contacto">
          <TextField
            id="standard-phone"
            label="Teléfono"
            disabled
            className={classes.textField}
            value={me.phone}
            onChange={handleChange('phone')}
            margin="normal"
					/>
          <TextField
            id="standard-phone"
            label="Email"
            disabled
            className={classes.textField}
            value={email}
            fullWidth
            onChange={handleChange('email')}
            margin="normal"
					/>
        </Grid>
      </div>
      <div style={{ textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom>
					Datos de envio
        </Typography>
        <Grid value="Información de envio">
          <TextField
            id="standard-email"
            label="Dirección"
            disabled
            className={classes.textField}
            value={me.address}
            onChange={handleChange('email')}
            margin="normal"
				/>
          <TextField
            id="standard-phone"
            label="Ciudad"
            disabled
            className={classes.textField}
            value={me.city}
            onChange={handleChange('phone')}
            margin="normal"
				/>
          <TextField
            id="standard-phone"
            label="Código Postal"
            disabled
            className={classes.textField}
            value={me.postal_code}
            onChange={handleChange('phone')}
            margin="normal"
				/>
        </Grid>
      </div>
      <div>
        {myProfile
          ? (
            <Button
              style={{ float: 'left', marginTop: 50 }}
              variant="contained"
              color="primary"
              onClick={() => logout()}
					>
					Cerrar Sesión
            </Button>
          )
				  : null
				}
      </div>
    </React.Fragment>
  );
};

export default Profile;
