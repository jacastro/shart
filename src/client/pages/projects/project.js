import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import Typography from '@material-ui/core/Typography';
import AppContext from '../../context';

import { get } from '../../services';

import { phases } from '../../../config';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      project: null,
      open: false,
      images: [],
    };
  }

  componentDidMount() {
    const { user } = this.context;
    get(`/projects/${this.props.match.params.id}`)
      .then(response => this.setState({
        project: response.data,
        isMyProject: response.data.owner.id === user.id,
        images: response.data.images.map(image => ({
          url: image,
          col: Math.floor(Math.random() * 3) + 1,
        }))
      }));
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { project, images, isMyProject } = this.state;

    return (
      <React.Fragment>
        {project == null ? <CircularProgress /> : (
          <Card className="card-project">
            <CardHeader
              action={isMyProject && [
                <Link to={`/me/projects/modify/${project.id}`}>
                  <IconButton aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </Link>,
                <IconButton aria-label="Delete">
                  <DeleteForeverIcon />
                </IconButton>
              ]}
              title={project.name}
              subheader={
                <Link to={`/profile/${project.owner.id}`}>{`Creado por @${project.owner.user_name}`}</Link>
            }
            />
            {project.images.length > 0
            && <CardMedia className="card-project-media" image={project.images[0]} />
            }
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={8} className="card-project-meta">
                  <div>
                    <Typography variant="body2" display="block">{project.description}</Typography>
                  </div>
                  <div>
                    <Typography variant="overline">Ubicación:</Typography>
                    <Chip className="card-project-tags" label={project.region} icon={<PlaceIcon />} component="a" href={`/places/${project.region}`} />
                  </div>
                  {project.project_leader && (
                    <div>
                      <Typography variant="overline">Líder de Proyecto:</Typography>
                      <Chip color="primary" className="card-project-tags" label={project.project_leader.full_name} icon={<FaceIcon />} component="a" href={`/users/${project.project_leader.id}`} />
                    </div>
                  )}
                  <div>
                    <Typography variant="overline">Posiciones abiertas & colaboraciones:</Typography>
                    <List dense disablePadding>
                      {project.phases.map((phase, index) => (
                        <div key={phase.id}>
                          <ListItem divider button onClick={this.toggle}>
                            <ListItemIcon>
                              <ViewListIcon />
                            </ListItemIcon>
                            <ListItemText primary={phase.name} secondary={phase.tasks.length > 1 ? `${phase.tasks.length} tareas` : `${phase.tasks.length} tarea`} />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                          </ListItem>
                          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <List dense component="div" disablePadding>
                              {phase.tasks.map((task, index) => (
                                <ListItem divider key={task.id} button>
                                  <ListItemIcon>
                                    {task.status === 'in_progress'
                                    && <AssignmentIndIcon color="secondary" />}
                                    {task.status === 'open'
                                    && <AssignmentIcon color="primary" />}
                                    {task.status === 'done'
                                    && <AssignmentTurnedInIcon color="disabled" />}
                                  </ListItemIcon>
                                  <ListItemText primary={task.name} secondary={task.status}/>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </div>
                      ))}
                    </List>
                  </div>
                </Grid>
                <Grid item xs={4} className="card-project-meta">
                  <div>
                    <Typography variant="overline" gutterBottom>Categoría: </Typography>
                    <Chip color="primary" className="card-project-tags" key={project.category} label={project.category} component="a" href={`/search/category/${project.category}`} />
                  </div>
                  <div>
                    {project.tags.length > 0
                    && <Typography variant="overline" gutterBottom>Tags: </Typography>
                  }
                    {project.tags.map((tag, index) => (
                      <Chip color="secondary" key={tag} className="card-project-tags" label={tag} component="a" href={`/search/tags/${tag}`} />
                    ))}
                  </div>
                  {project.images.length > 1
                    && (
                      <div>
                        <Typography variant="overline" gutterBottom>Imágenes del Proyecto:</Typography>
                        <div className="card-project-gallery-root">
                          <GridList cellHeight={100} className="card-project-gallery" cols={3}>
                            {images.map(image => (
                              <GridListTile key={image.url} cols={image.col}>
                                <img src={image.url} alt={image.url} />
                              </GridListTile>
                            ))}
                          </GridList>
                        </div>
                      </div>
                    )
                  }
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="overline">Estado de avance del proyecto:</Typography>
                  <Link to={`/projects/${project.id}/tasks`}>
                    <Button color="primary" variant="outlined" style={{ float: 'right' }}>
                      Ver tareas
                    </Button>
                  </Link>
                  <Stepper>
                    {phases.map((phase, index) => (
                      <Step key={phase.id} active={project.current_phase === phase.id}>
                        <StepLabel key={phase.id}>
                          {phase.name.toUpperCase()}
                          {phase.id === 'init'
                        && (
                        <Typography display="block" variant="overline">
                          <Moment format="DD/MM/YYYY">{project.start_date}</Moment>
                        </Typography>
                        )}
                          {phase.id === 'final'
                        && (
                        <Typography display="block" variant="overline">
                          <Moment format="DD/MM/YYYY">{project.end_date}</Moment>
                        </Typography>
                        )}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                <Grid item xs={12} />
              </Grid>
            </CardContent>
            {!isMyProject && (
              <React.Fragment>
                <Divider variant="middle" />
                <CardActions>
                  <IconButton className="card-project-action" aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton className="card-project-action" aria-label="Compartir">
                    <ShareIcon />
                  </IconButton>
                  {project.need_collaborations
                  && (
                    <Button href="#" className="card-project-apply" color="primary" variant="outlined">
                      <AddCircleIcon />
                      Postularme
                    </Button>
                  )
                  }
                </CardActions>
              </React.Fragment>
            )}
          </Card>
        )}
      </React.Fragment>
    );
  }
}

Project.contextType = AppContext;

export default Project;
