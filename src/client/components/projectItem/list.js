import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProjectItem from '.';

const ProjectList = ({ title, list, loading }) => (
  <React.Fragment>
    <Typography gutterBottom variant="h2" color="textSecondary" align="left">{title}</Typography>
    {loading ? <CircularProgress /> : (
      <Grid container spacing={3}>
        {
          list.map((project, index) => (
            <Grid key={project} item xs={4}>
              <ProjectItem id={index} {...project} />
            </Grid>
          ))
        }
      </Grid>
    )}
  </React.Fragment>
);

ProjectList.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

ProjectList.defaultProps = {
  title: 'Proyectos',
  list: [],
  loading: false,
};

export default ProjectList;
