import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkUI from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import FaceIcon from '@material-ui/icons/Face';
import ShareIcon from '@material-ui/icons/Share';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import WatchLaterIcon from '@material-ui/icons/WatchLaterOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Rating from 'material-ui-rating';
import AppContext from '../../context';

import { get, del, post } from '../../services';
import { getAcronym } from '../../../utils/users';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      project: null,
      open: false,
      images: [],
      openDialog: false,
    };
  }

  componentDidMount() {
    const { user } = this.context;
    get(`/projects/${this.props.match.params.id}`)
      .then(response => this.setState({
        project: response.data,
        isMyProject: response.data.owner.id === user.id,
        images: response.data.images.map(image => ({
          key: `img-${image}`,
          url: image,
          col: Math.floor(Math.random() * 3) + 1,
        }))
      }));
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  handleDelete() {
    const { history, match } = this.props;
    const project = { ...this.state.project };
    this.setState({ project: null, openDialog: false });
    del(`/projects/${match.params.id}`)
      .then(() => {
        history.replace('/me/projects');
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ project });
      });
  }

  handleRate(project, value) {
    const rating = { rating: value };
    console.log(value, rating);
    post(`/projects/${project.id}/rate`, rating)
      .then(() => {
        project.rating = value;
        this.setState({ project });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ project });
      });
  }

  render() {
    const { project, images, isMyProject, openDialog } = this.state;

    return (
      <React.Fragment>
        {project == null ? <CircularProgress /> : (
          <React.Fragment>
            <div className="pycontainer">
              <Breadcrumbs gutterBottom aria-label="Breadcrumb">
                {isMyProject ? (
                  <Link to="/me/projects">
                    <LinkUI color="inherit">
                      Mis proyectos
                    </LinkUI>
                  </Link>
                ) : (
                  <Link to={`/search/category/${project.category}`}>
                    <LinkUI color="inherit">
                      {`Proyectos categoría ${project.category}`}
                    </LinkUI>
                  </Link>
                )}
                <Typography color="textPrimary">{project.name}</Typography>
              </Breadcrumbs>
              <Card className="card-project">
                <CardHeader
                  action={isMyProject ? [
                    <Link key="1" to={`/me/projects/modify/${project.id}`}>
                      <IconButton aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>,
                    <IconButton key="2" aria-label="Delete" onClick={() => this.setState({ openDialog: true })}>
                      <DeleteForeverIcon />
                    </IconButton>,
                    <Rating
                      className="card-project-action"
                      value={project.rating}
                      editing={false}
                    />
                  ] : (
                    <Rating
                      className="card-project-action"
                      value={project.rating}
                      max={5}
                      onChange={value => this.handleRate(project, value)}
                    />
                  )
                  }
                  title={project.name}
                />
                <Grid container>
                  <Grid item xs={8} className="card-project-meta">
                    {project.images.length > 0 && (
                      <CardMedia className="card-project-media" image={project.images[0]} />
                    )}
                  </Grid>
                  <Grid item xs={4} className="card-project-right">
                    <List>
                      {project.postulants.length > 0 && isMyProject && (
                        <Link to={`/projects/${project.id}/tasks`}>
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar className="postulations">
                                <Check />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Ver postulantes" secondary={`${project.postulants.length} postulantes esperan tu respuesta`} />
                          </ListItem>
                        </Link>
                      )}
                      <ListItem>
                        <ListItemText primary={project.description} />
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                      <Link to={`/profile/${project.project_leader.user.id}`}>
                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar>
                              {getAcronym(project.owner) || <FaceIcon />}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={project.owner.user_name} secondary="Creador del proyecto" />
                        </ListItem>
                      </Link>
                      {project.project_leader && (
                        <Link to={`/profile/${project.project_leader.id}`}>
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar>
                                {getAcronym(project.project_leader) || <FaceIcon />}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={project.project_leader.full_name} secondary="Lider de Proyecto" />
                          </ListItem>
                        </Link>
                      )}
                    </List>
                    <Divider />
                    <List>
                      <ListItem>
                        <ListItemText secondary="Categoría" />
                        <Link to={`/search/category/${project.category}`}>
                          <Chip
                            color="primary"
                            className="card-project-tags"
                            label={project.category}
                          />
                        </Link>
                      </ListItem>
                      {project.tags.length > 0 && (
                        <ListItem>
                          <ListItemText secondary="Tags" />
                          {project.tags.map(tag => (
                            <Link key={tag} to={`/search/tags/${tag}`}>
                              <Chip
                                key={`tag-${tag}`}
                                color="secondary"
                                className="card-project-tags"
                                label={tag}
                              />
                            </Link>
                          ))}
                        </ListItem>
                      )}
                      <ListItem>
                        <ListItemText secondary="Ubicación" />
                        <Link to={`/search/region/${project.region}`}>
                          <Chip
                            className="card-project-tags"
                            label={project.region}
                            icon={<PlaceIcon />}
                          />
                        </Link>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      {project.images.length > 1
                      && (
                        <div>
                          <Typography variant="overline" gutterBottom>Imágenes del Proyecto:</Typography>
                          <GridList cellHeight={180} cols={5}>
                            {images.map(image => (
                              <GridListTile key={`image-${image.url}`} cols={1} rows={1}>
                                <img src={image.url} alt={image.url} />
                              </GridListTile>
                            ))}
                          </GridList>
                        </div>
                      )
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="overline">Estado de avance del proyecto:</Typography>
                      <Link to={`/projects/${project.id}/tasks`}>
                        <Button color="primary" variant="outlined" style={{ float: 'right' }}>
                          {isMyProject ? (
                            <React.Fragment>
                              <WatchLaterIcon className="mr5px" />
                              Seguimiento de tareas
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <AddCircleIcon className="mr5px" />
                              Ver tareas para postularme
                            </React.Fragment>
                          )}
                        </Button>
                      </Link>
                      <Stepper>
                        {project.phases.map((phase, index) => (
                          <Step key={`ph-${phase.id}`} active={project.current_phase === phase.id}>
                            <StepLabel key={phase.id}>
                              {phase.name.toUpperCase()}
                              {index === 0 && (
                                <Typography display="block" variant="overline">
                                  <Moment format="DD/MM/YYYY">{project.start_date}</Moment>
                                </Typography>
                              )}
                              {index === (project.phases.length - 1) && (
                                <Typography display="block" variant="overline">
                                  <Moment format="DD/MM/YYYY">{project.end_date}</Moment>
                                </Typography>
                              )}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </React.Fragment>
        )}
        <Dialog
          open={openDialog}
          onClose={() => this.setState({ openDialog: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">¿Estás seguro que deseas borrar el proyecto?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta acción no puede deshacerse.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ openDialog: false })} variant="contained" color="primary" autoFocus>
              Cancelar
            </Button>
            <Button onClick={this.handleDelete} variant="contained" autoFocus>
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

Project.contextType = AppContext;

export default Project;
