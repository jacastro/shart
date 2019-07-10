import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProjectItem from '.';
import EmptyProjectItem from './empty';

const ProjectList = ({ title, list, loading }) => (
  <div className="pycontainer">
    <Typography gutterBottom variant="h3" component="h2" color="textSecondary" align="left">{title}</Typography>
    {loading ? <CircularProgress /> : (
      <Grid container spacing={3} justify="center" alignItems="center">
        {
          list.length === 0 ? (
            <Grid item xs={6}>
              <EmptyProjectItem id="404" />
            </Grid>
          ) : (
            list.map((project, index) => (
              <Grid key={project} item xs={4}>
                <ProjectItem id={index} {...project} />
              </Grid>
            ))
          )
        }
      </Grid>
    )}
  </div>
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
