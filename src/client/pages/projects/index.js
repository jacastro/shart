import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppContext from '../../context';
import ProjectItem from '../../components/projectItem';
import { categories, tags } from '../../../config';

import { get } from '../../services';

import './styles.scss';
import ProjectList from '../../components/projectItem/list';

const titleType = {
  category: id => `Proyectos con categoría ${(categories.find(category => category.value === id) || {}).label || id}`,
  tags: id => `Proyectos de etiqueta ${(tags.find(tag => tag.value === id) || {}).label || id}`,
  region: id => `Proyectos en  ${id}`,
};

class ProjectsPage extends React.Component {
  state = {
    list: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id, type } = match.params;

    get('/projects', {
      [type]: id,
      only_need_collaboration: true,
    })
      .then(({ data }) => {
        this.setState({ list: data });
      });
  }

  render() {
    const { list } = this.state;
    const { match } = this.props;
    const { id, type } = match.params;
    const title = type ? titleType[type](id) : 'Todos los proyectos';

    return (
      <ProjectList list={list} title={title} loading={list == null} />
    );
  }
}

ProjectsPage.contextType = AppContext;

export default ProjectsPage;
