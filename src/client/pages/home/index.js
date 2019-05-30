import React, { useContext } from 'react';

import AppContext from '../../context';

const HomePage = () => {
  const { user } = useContext(AppContext);

  console.log(user);

  return (
    <h1>home</h1>
  );
};

export default HomePage;
