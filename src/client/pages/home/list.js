import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarRateIcon from '@material-ui/icons/StarRate';
import Badge from '@material-ui/core/Badge';

const ProjectList = ({ title, list, loading, children }) => (
  <React.Fragment>
    <Typography className="project-list-title" variant="h2">
      {title}
      {children}
    </Typography>
    {loading ? <CircularProgress /> : (
      <GridList component="div" cols={3.5} cellHeight={280}>
        {list.map(project => (
          <GridListTile component="a" key={project.id} cols={1} rows={1} href={`/projects/${project.id}`}>
            <img src={project.images[0]} alt={project.name} />
            <GridListTileBar
              title={project.name.toUpperCase()}
              subtitle={`Creado por @${project.owner.user_name}`}
              actionIcon={
                <Badge className="inside-badge" color="secondary" badgeContent={project.rating} />
              }
            />
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
