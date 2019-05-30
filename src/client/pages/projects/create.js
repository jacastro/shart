import React, { useContext } from 'react';

import AppContext from '../../context';

const CreateProjectPage = () => {
  const { user } = useContext(AppContext);

  console.log(user);

  return (
    <h1>CreateProjectPage</h1>
  );
};

export default CreateProjectPage;
