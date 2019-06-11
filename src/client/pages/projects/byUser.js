import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ProjectItem from '../../components/projectItem';
import AppContext from '../../context';
import './styles.scss';

import { get } from '../../services';

class MyProjectsPage extends React.Component {
  state = {
    list: null,
  };

  componentDidMount() {
    const { user } = this.context;
    get(`/users/${user.id}/projects`)
      .then(response => {
        const data = response.data.projects;
        this.setState({ list: data });
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { list } = this.state;

    return (
      <React.Fragment>
        <Typography gutterBottom variant="h2" color="textSecondary" align="left">Mis proyectos</Typography>
        {list == null ? <CircularProgress /> : (
          <Grid container justify="center" spacing={32}>
            {
              list.map((project, index) => (
                <Grid key={index} item xs={4}>
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

MyProjectsPage.contextType = AppContext;

export default MyProjectsPage;
