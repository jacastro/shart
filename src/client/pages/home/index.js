import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    get(`/projects?tags=${userTags.join(',')}`)
      .then(({ data }) => {
        console.log(data)
        this.setState({ listRecommended: data || [] });
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
      <div className="container-home">
        <ProjectList list={projects} title="Mis Proyectos" loading={projects == null}>
          <Link to="/me/projects/create">
            <Button variant="contained" color="primary" className="create-project-button">
              <AddIcon />
            Nuevo Proyecto
            </Button>
          </Link>
          {(projects == null || projects.length === 0)
        && <Typography variant="body1" gutterBottom color="textSecondary" className="pt15px">¡Aún no tienes proyectos! Para comenzar, crea un nuevo proyecto haciendo click en el botón superior "Nuevo Proyecto" o seleccionando la opción "Crear Proyecto" desde el menú principal :)</Typography>
        }
        </ProjectList>
        {listRecommended != null && listRecommended.length > 0
      && <ProjectList list={listRecommended} title="Recomendados para vos" loading={listRecommended == null} />
      }
        {listTopViewed != null && listTopViewed.length > 0
      && <ProjectList list={listTopViewed} title="Los más vistos" loading={listTopViewed == null} />
      }
        {listTopRated != null && listTopRated.length > 0
      && <ProjectList list={listTopRated} title="Los más valorados" loading={listTopRated == null} />
      }
        {listTopNew != null && listTopNew.length > 0
      && <ProjectList list={listTopNew} title="Recién salidos del horno" loading={listTopNew == null} />
      }
      </div>
    );
  }
}

Home.contextType = AppContext;

export default Home;
