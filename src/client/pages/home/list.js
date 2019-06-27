import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const ProjectList = ({ title, list, loading, children }) => (
  <React.Fragment>
    <Typography className="project-list-title" variant="h2">
      {title}
      {children}
    </Typography>
    {loading ? <CircularProgress /> : (
      <GridList cols={3.5} cellHeight={280}>
        {list.map(project => (
          <GridListTile key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <img className="MuiGridListTile-imgFullWidth" src={project.images[0]} alt={project.name} />
              <GridListTileBar
                title={project.name.toUpperCase()}
                subtitle={`Creado por @${project.owner.user_name}`}
                actionIcon={(
                  <IconButton aria-label="Información del Proyecto" color="secondary" href={`/projects/${project.id}`}>
                    <InfoIcon />
                  </IconButton>
                )}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    )}
  </React.Fragment>
);

ProjectList.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ProjectList.defaultProps = {
  title: 'Proyectos',
  list: [],
  loading: false,
};

export default ProjectList;
