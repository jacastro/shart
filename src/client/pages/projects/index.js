import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AppContext from '../../context';

import ProjectItem from '../../components/projectItem';

import './styles.scss';


class ProjectsPage extends React.Component {
  state = {
    list: null,
  };

  componentDidMount() {
    fetch('/api/getList')
      .then(res => res.json())
      .then(list => this.setState({ list }));
  }

  render() {
    const { list } = this.state;

    return (
      <React.Fragment>
        <Typography gutterBottom variant="h2" color="textSecondary" align="left">Listado de proyectos</Typography>
        {list == null ? <CircularProgress /> : (
          <Grid container justify="center" spacing={32}>
            {
              list.map((project, index) => (
                <Grid key={project} item xs={4}>
                  <ProjectItem id={index} name={project} />
                </Grid>
              ))
            }
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

ProjectsPage.contextType = AppContext;

export default ProjectsPage;
