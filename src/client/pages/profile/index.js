import React, { useContext } from 'react';

import AppContext from '../../context';

const ProfilePage = ({ match }) => {
  const { user } = useContext(AppContext);

  const profileId = match.params.id;

  return (
    <h1>{profileId ? `Perfil de ${profileId}` : 'Mi perfil'}</h1>
  );
};

export default ProfilePage;
