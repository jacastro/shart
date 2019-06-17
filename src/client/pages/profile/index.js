import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';

import Button from '@material-ui/core/Button';

import AppContext from '../../context';

const ProfilePage = ({ match }) => {
  const { user } = useContext(AppContext);
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);

  const profileId = match.params.id;

  const logout = () => {
    removeCookie('userId', { path: '/' });
    location.reload();
  };

  return (
    <div>
      <h1>{profileId ? `Perfil de ${profileId}` : 'Mi perfil'}</h1>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => logout()}
      >
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default ProfilePage;
