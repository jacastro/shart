import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ProjectItem from '../../components/projectItem';
import AppContext from '../../context';
import './styles.scss';

import { get } from '../../services';
import ProjectList from '../../components/projectItem/list';

class WorkingProjectsPage extends React.Component {
  state = {
    list: null,
  };

  componentDidMount() {
    const { user } = this.context;
    get(`/users/${user.id}/working-projects`)
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
      <ProjectList list={list} title="Proyectos donde colaboro" loading={list == null} />
    );
  }
}

WorkingProjectsPage.contextType = AppContext;

export default WorkingProjectsPage;
