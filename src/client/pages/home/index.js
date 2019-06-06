import React, { useContext } from 'react';
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

const axios = require('axios');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }

  componentDidMount() {
    axios.get('../api/projects')
      .then((response) => {
        const data = response.data.projects;
        this.setState({ projects: data });
        // handle success
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { projects } = this.state;

    return (
      <React.Fragment>
        <Container className="container-home">
          <Container className="home-projects">
            <Typography id="my-projects" variant="h2" gutterBottom>
              Mis Proyectos
              <Button variant="contained" color="primary" href="/me/projects/create">
                <AddIcon />
                Nuevo Proyecto
              </Button>
            </Typography>
            {projects == null ? <CircularProgress /> : (
              <GridList cols={2.5}>
                {projects.map(project => (
                  <GridListTile key={project.id}>
                    <img src={project.images[0]} alt={project.name} />
                    <GridListTileBar
                      title={project.name.toUpperCase()}
                      subtitle={`Creado por @${project.owner.user_name}`}
                      actionIcon={(
                        <IconButton aria-label="Información del Proyecto" color="secondary" href={`/projects/${project.id}`}>
                          <InfoIcon />
                        </IconButton>
                      )}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </Container>
          <Container className="home-projects">
            <Typography variant="h2" gutterBottom>Recomendados para vos</Typography>
            {projects == null ? <CircularProgress /> : (
              <GridList cols={2.5}>
                {projects.map(project => (
                  <GridListTile key={project.id}>
                    <img src={project.images[0]} alt={project.name} />
                    <GridListTileBar
                      title={project.name.toUpperCase()}
                      subtitle={`Creado por @${project.owner.user_name}`}
                      actionIcon={(
                        <IconButton aria-label="Información del Proyecto" color="secondary">
                          <InfoIcon />
                        </IconButton>
                      )}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </Container>
          <Container className="home-projects">
            <Typography variant="h2" gutterBottom>Tendencias</Typography>
            {projects == null ? <CircularProgress /> : (
              <GridList cols={2.5}>
                {projects.map(project => (
                  <GridListTile key={project.id}>
                    <img src={project.images[0]} alt={project.name} />
                    <GridListTileBar
                      title={project.name.toUpperCase()}
                      subtitle={`Creado por @${project.owner.user_name}`}
                      actionIcon={(
                        <IconButton aria-label="Información del Proyecto" color="secondary">
                          <InfoIcon />
                        </IconButton>
                      )}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </Container>
          <Container className="home-projects">
            <Typography variant="h2" gutterBottom>Recién salidos del horno</Typography>
            {projects == null ? <CircularProgress /> : (
              <GridList cols={2.5}>
                {projects.map(project => (
                  <GridListTile key={project.id}>
                    <img src={project.images[0]} alt={project.name} />
                    <GridListTileBar
                      title={project.name.toUpperCase()}
                      subtitle={`Creado por @${project.owner.user_name}`}
                      actionIcon={(
                        <IconButton aria-label="Información del Proyecto" color="secondary">
                          <InfoIcon />
                        </IconButton>
                      )}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </Container>
          <Container className="home-projects">
            <Typography variant="h2" gutterBottom>Anteriores</Typography>
            {projects == null ? <CircularProgress /> : (
              <GridList cols={2.5}>
                {projects.map(project => (
                  <GridListTile key={project.id}>
                    <img src={project.images[0]} alt={project.name} />
                    <GridListTileBar
                      title={project.name.toUpperCase()}
                      subtitle={`Creado por @${project.owner.user_name}`}
                      actionIcon={(
                        <IconButton aria-label="Información del Proyecto" color="secondary">
                          <InfoIcon />
                        </IconButton>
                      )}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

Home.contextType = AppContext;

export default Home;
