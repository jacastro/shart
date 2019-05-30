import React, { useContext } from 'react';

import AppContext from '../../context';

const ProjectsPage = () => {
  const { user } = useContext(AppContext);

  console.log(user);

  return (
    <h1>ProjectsPage</h1>
  );
};

export default ProjectsPage;
