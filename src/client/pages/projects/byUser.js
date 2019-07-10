import React from 'react';
import AppContext from '../../context';
import './styles.scss';

import { get } from '../../services';
import ProjectList from '../../components/projectItem/list';

class MyProjectsPage extends React.Component {
  state = {
    list: null,
  };

  componentDidMount() {
    const { user } = this.context;
    get(`/users/${user.id}/projects`)
      .then(({ data }) => {
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
      <ProjectList list={list} title="Mis proyectos" loading={list == null} />
    );
  }
}

MyProjectsPage.contextType = AppContext;

export default MyProjectsPage;
