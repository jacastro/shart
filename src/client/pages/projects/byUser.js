import React, { useContext } from 'react';

import AppContext from '../../context';

const ProjectOfUserPage = ({ match }) => {
  const { user } = useContext(AppContext);

  const profileId = match.params.id || 'yoooo';

  return (
    <h1>{`Proyectos de ${profileId}`}</h1>
  );
};

export default ProjectOfUserPage;
