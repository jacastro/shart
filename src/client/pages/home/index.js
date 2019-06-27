import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import AppContext from '../../context';

import ProjectList from './list';

import { get } from '../../services';

import './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }

  componentDidMount() {
    const { user } = this.context;
    const userTags = (user.me && user.me.tags) || [];

    get(`/users/${user.id}/projects`)
      .then(({ data }) => {
        this.setState({ projects: data });
      });
    get('/projects', { tags: userTags.join(',') })
      .then(({ data }) => {
        this.setState({ listRecommended: data.projects || [] });
      });
    get('/projects/top-new', { limit: 5 })
      .then(({ data }) => {
        this.setState({ listTopNew: data.projects });
      });
    get('/projects/top-rated', { limit: 5 })
      .then(({ data }) => {
        this.setState({ listTopRated: data.projects });
      });
    get('/projects/top-viewed', { limit: 5 })
      .then(({ data }) => {
        this.setState({ listTopViewed: data.projects });
      });
  }

  render() {
    const { projects, listTopNew, listTopRated, listTopViewed, listRecommended } = this.state;

    return (
      <Container className="container-home">
        <ProjectList list={projects} title="Mis Proyectos" loading={projects == null}>
          <Link to="/me/projects/create">
            <Button variant="contained" color="primary" className="create-project-button">
              <AddIcon />
              Nuevo Proyecto
            </Button>
          </Link>
        </ProjectList>
        <ProjectList list={listRecommended} title="Recomendados para vos" loading={listRecommended == null} />
        <ProjectList list={listTopViewed} title="Los más vistos" loading={listTopViewed == null} />
        <ProjectList list={listTopRated} title="Los más valorados" loading={listTopRated == null} />
        <ProjectList list={listTopNew} title="Recién salidos del horno" loading={listTopNew == null} />
      </Container>
    );
  }
}

Home.contextType = AppContext;

export default Home;
