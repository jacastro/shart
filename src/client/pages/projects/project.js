import React, { useContext } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import AppContext from '../../context';

const ProjectPage = ({ match }) => {
  const { user } = useContext(AppContext);

  const projectId = match.params.id;

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h2" color="textSecondary" align="left">{`Proyecto Nº ${projectId}`}</Typography>
      <CircularProgress />
    </React.Fragment>
  );
};

export default ProjectPage;
