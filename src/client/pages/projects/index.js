import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppContext from '../../context';
import ProjectItem from '../../components/projectItem';
import { categories, tags } from '../../../config';

import { get } from '../../services';

import './styles.scss';

const titleType = {
  tags: id => `Proyectos con etiqueta ${categories.find(category => category.value === id).label}`,
  category: id => `Proyectos de categoría ${tags.find(tag => tag.value === id).label}`,
};

class ProjectsPage extends React.Component {
  state = {
    list: null,
    listTopNew: null,
    listTopRated: null,
    listTopViewed: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id, type } = match.params;

    get('/projects', {
      [type]: id,
    })
      .then((response) => {
        const data = response.data.projects;
        this.setState({ list: data });
      });

    get('/projects/top-new', {
      [type]: id,
    })
      .then((response) => {
        const data = response.data.projects;
        this.setState({ listTopNew: data });
      });

    get('/projects/top-rated', {
      [type]: id,
    })
      .then((response) => {
        const data = response.data.projects;
        this.setState({ listTopRated: data });
      });

    get('/projects/top-viewed', {
      [type]: id,
    })
      .then((response) => {
        const data = response.data.projects;
        this.setState({ listTopViewed: data });
      });

    // get('/projects&tags=???????', {
    //   [type]: id,
    // })
    //   .then((response) => {
    //     const data = response.data.projects;
    //     this.setState({ listRecommended: data });
    //   });

    // get('/users/ae4cc7ac-0052-47e0-b2b1-499c6461e509/projects', {
    //   [type]: id,
    // })
    //   .then((response) => {
    //     const data = response.data.projects;
    //     this.setState({ myProjects: data });
    //   });

    // get('/users/ae4cc7ac-0052-47e0-b2b1-499c6461e509/working-projects', {
    //   [type]: id,
    // })
    //   .then((response) => {
    //     const data = response.data.projects;
    //     this.setState({ myWorkingProjects: data });
    //   });
  }

  render() {
    const { list } = this.state;
    const { match } = this.props;
    const { id, type } = match.params;
    const title = type ? titleType[type](id) : 'Todos los proyectos';

    return (
      <React.Fragment>
        <Typography gutterBottom variant="h2" color="textSecondary" align="left">{title}</Typography>
        {list == null ? <CircularProgress /> : (
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
  }
}

ProjectsPage.contextType = AppContext;

export default ProjectsPage;
