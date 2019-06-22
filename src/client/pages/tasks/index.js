import React from 'react';
import uuid from 'uuid/v1';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import CheckCircle from '@material-ui/icons/CheckCircle';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { phases, statuses } from '../../../config';
import { getAcronym } from '../../../utils/users';
import ProjectUtils from '../../../utils/projects';

import { get, post, put, del } from '../../services';

import AppContext from '../../context';

import './styles.scss';

export default class ProjectTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      dialogCreateOpen: false,
      dialogModifyOpen: false,
      dialogCreatePhaseOpen: false,
      selectedPhaseId: 0,
      selectedStatusId: 0,
      selectedTaskId: 0,
      taskName: null,
      phaseName: null,
      isMyProject: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeTaskName = this.handleChangeTaskName.bind(this);
    this.handleChangePhaseName = this.handleChangePhaseName.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleCreatePhase = this.handleCreatePhase.bind(this);
    this.handleModifyTaskName = this.handleModifyTaskName.bind(this);
    this.handleRemoveTaskCollaborator = this.handleRemoveTaskCollaborator.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { user = {} } = this.context;
    get(`/projects/${match.params.id}`)
      .then(({ data: project }) => {
        const isMyProject = project.owner.id === user.id;
        if (project.phases.length === 0) {
          const projectPhases = phases.map(phase => ({ ...phase, tasks: [] }));
          put(`/projects/${project.id}`, { phases: projectPhases })
            .then(() => {
              this.setState({
                project: {
                  ...project,
                  phases: projectPhases,
                },
                isMyProject,
              });
            });
        } else {
          this.setState({ project, isMyProject });
        }
      });
  }

  handleClickCreateOpen(selectedPhaseId, selectedStatusId) {
    this.setState({ dialogCreateOpen: true, selectedPhaseId, selectedStatusId });
  }

  handleClickTask(selectedPhaseId, selectedTaskId) {
    const { project, isMyProject } = this.state;
    const { user = {}, me = {} } = this.context;

    const phaseData = project.phases[selectedPhaseId];
    const taskData = phaseData.tasks[selectedTaskId];

    console.log(user);

    if (isMyProject) {
      return this.setState({ dialogModifyOpen: true, taskName: taskData.name, selectedPhaseId, selectedTaskId });
    }

    if (taskData.collaborator) {
      return alert('No puedes postularte porque esta tarea ya tiene un colaborador designado.');
    }

    if (taskData.status !== 'todo') {
      return alert('No puedes postularte porque esta tarea ya está en progreso');
    }

    if (!project.need_collaborations) {
      return alert('No puedes postularte porque este proyecto no admite colaboradores');
    }

    const postulant = ProjectUtils.wasPostuled(project, me.id, phaseData.id, taskData.id);
    if (postulant) {
      project.postulants = project.postulants.filter(aPostulant => aPostulant.id !== postulant.id);
      this.setState({ project });
      
      del(`/projects/${project.id}/postulants/${postulant.id}`);
    } else {
      const postulantData = {
        id: uuid(),
        phase: phaseData.id,
        task_id: taskData.id,
        task_name: taskData.name,
        collaborator_id: me.id,
      };
      project.postulants.push(postulantData);
      this.setState({ project });

      post(`/projects/${project.id}/postulant`, postulantData);
    }
  }

  handleChangeTaskName(event) {
    this.setState({ taskName: event.target.value });
  }

  handleChangePhaseName(event) {
    this.setState({ phaseName: event.target.value });
  }

  handleSetCurrentPhase(selectedPhaseId) {
    const { project } = this.state;
    const phaseData = project.phases[selectedPhaseId];
    project.current_phase = phaseData.id;

    this.setState({ project });
    put(`/projects/${project.id}`, { current_phase: phaseData.id });
  }

  handleAddPhase(selectedPhaseId) {
    this.setState({ selectedPhaseId, dialogCreatePhaseOpen: true, phaseName: null });
  }

  handleMove(phaseId, taskIndex, statusIndex) {
    const { project } = this.state;
    const statusData = statuses[statusIndex];

    const phaseData = project.phases[phaseId];
    const taskData = phaseData.tasks[taskIndex];
    taskData.status = statusData.id;

    this.setState({ project });

    put(`/projects/${project.id}/phases/${phaseData.id}/tasks/${taskData.id}`, taskData);
  }

  handleClose() {
    this.setState({ dialogCreateOpen: false, dialogModifyOpen: false, taskName: null });
  }

  handleCreateTask() {
    const { project, taskName, selectedPhaseId, selectedStatusId } = this.state;

    const phaseData = project.phases[selectedPhaseId];
    const statusData = statuses[selectedStatusId];

    const task = {
      id: uuid(),
      name: taskName,
      status: statusData.id,
    };

    phaseData.tasks.push(task);

    this.setState({ project, dialogCreateOpen: false, taskName: null });

    post(`/projects/${project.id}/phases/${phaseData.id}/tasks`, task);
  }

  handleModifyTaskName() {
    const { project, selectedPhaseId, selectedTaskId, taskName } = this.state;

    const phaseData = project.phases[selectedPhaseId];
    const taskData = phaseData.tasks[selectedTaskId];
    taskData.name = taskName;

    this.setState({ project, dialogModifyOpen: false, taskName: null });

    put(`/projects/${project.id}/phases/${phaseData.id}/tasks/${taskData.id}`, taskData);
  }

  handleRemoveTaskCollaborator() {
    const { project, selectedPhaseId, selectedTaskId } = this.state;

    const phaseData = project.phases[selectedPhaseId];
    const taskData = phaseData.tasks[selectedTaskId];
    taskData.collaborator = null;
    taskData.collaborator_id = null;

    this.setState({ project, dialogModifyOpen: false });

    put(`/projects/${project.id}/phases/${phaseData.id}/tasks/${taskData.id}`, taskData);
  }

  handleCreatePhase() {
    const { project, phaseName, selectedPhaseId } = this.state;

    const phase = {
      id: uuid(),
      name: phaseName,
      tasks: [],
    };

    project.phases.splice(selectedPhaseId, 0, phase);

    this.setState({ project, selectedPhaseId: 0, dialogCreatePhaseOpen: false, phaseName: null });
    put(`/projects/${project.id}`, { phases: project.phases });
  }

  handleDeletePhase(selectedPhaseId) {
    const { project } = this.state;
    project.phases.splice(selectedPhaseId, 1);

    this.setState({ project });
    put(`/projects/${project.id}`, { phases: project.phases });
  }

  render() {
    const { project, dialogCreateOpen, dialogModifyOpen, dialogCreatePhaseOpen, taskName, phaseName, selectedPhaseId, selectedTaskId, selectedStatusId, isMyProject } = this.state;
    const { me } = this.context;

    let phaseActive = true;

    if (project == null) {
      return <CircularProgress />;
    }

    const phaseData = project.phases[selectedPhaseId];
    const taskData = phaseData.tasks[selectedTaskId];
    const statusData = statuses[selectedStatusId];

    console.log(this.state);

    return (
      <div>
        <Typography gutterBottom variant="h2" color="textSecondary" align="left">{project.name}</Typography>
        <div>
          {project.phases.map(({ id, name, tasks }, phaseId) => {
            phaseActive = project.current_phase === id ? false : phaseActive;
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={id}
                  id={id}
                >
                  <Typography>{name}</Typography>
                  {phaseActive && <CheckCircleOutline className="tasks-phase-icon" />}
                  {project.current_phase === id && <CheckCircle className="tasks-phase-icon active" />}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container spacing={2}>
                    {statuses.map((status, statusIndex) => (
                      <Grid item xs={4}>
                        <div className="tasks-col">
                          <Typography gutterBottom className="tasks-col-title" color="textSecondary" variant="subtitle2" align="left">
                            {status.name}
                          </Typography>
                          {tasks.map((task, taskIndex) => {
                            const wasPostuled = ProjectUtils.wasPostuled(project, me.id, id, task.id);
                            const postulants = ProjectUtils.getPostulants(project, id, task.id);
                            const isMyTask = (!task.collaborator && isMyProject) || (task.collaborator && task.collaborator.id === me.id);
                            const canApply = !isMyProject && !wasPostuled && !task.collaborator && task.status === 'todo' && project.need_collaborations;
                            return (
                              task.status === status.id ? (
                                <div className={`tasks-card ${isMyTask ? 'my-card' : ''} ${canApply ? 'can-apply' : ''}`}>
                                  <div
                                    onClick={() => this.handleClickTask(phaseId, taskIndex)}
                                    role="presentation"
                                  >
                                    {canApply && (
                                      <Avatar className="tasks-card-avatar"><PersonAddIcon /></Avatar>
                                    )}
                                    {task.collaborator && (
                                      <Avatar className="tasks-card-avatar">{getAcronym(task.collaborator) || <PersonIcon />}</Avatar>
                                    )}
                                    <div className="tasks-card-type task">Tarea</div>
                                    {isMyTask && <div className="tasks-card-type owner">Responsable</div>}
                                    {isMyProject && postulants.length > 0 && <div className="tasks-card-type postulants">{postulants.length}</div>}
                                    {!isMyProject && wasPostuled && <div className="tasks-card-type postuled">Postulado</div>}
                                    <Typography>{task.name}</Typography>
                                  </div>
                                  {statusIndex !== 0 && isMyTask && (
                                    <Fab size="small" aria-label="Add" className="tasks-card-move-left" onClick={() => this.handleMove(phaseId, taskIndex, statusIndex - 1)}>
                                      <ArrowBack />
                                    </Fab>
                                  )}
                                  {statusIndex !== (statuses.length - 1) && isMyTask && (
                                    <Fab size="small" aria-label="Add" className="tasks-card-move-right" onClick={() => this.handleMove(phaseId, taskIndex, statusIndex + 1)}>
                                      <ArrowForward />
                                    </Fab>
                                  )}
                                </div>
                              ) : null
                            );
                          })}
                          {isMyProject && (
                            <Fab color="primary" aria-label="Add" className="tasks-add" onClick={() => this.handleClickCreateOpen(phaseId, statusIndex)}>
                              <AddIcon />
                            </Fab>
                          )}
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  {project.current_phase !== id && <Button size="small" color="secondary" onClick={() => this.handleDeletePhase(phaseId)}>Eliminar fase</Button>}
                  {project.current_phase !== id && <Button size="small" onClick={() => this.handleSetCurrentPhase(phaseId)}>Marcar como fase activa</Button>}
                  <Button size="small" color="primary" onClick={() => this.handleAddPhase(phaseId)}>Agregar una fase</Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            );
          })}
        </div>
        <Dialog open={dialogCreateOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{`Agregar tarea ${statusData.name} a ${phaseData.name}`}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de tarea"
              value={taskName}
              onChange={this.handleChangeTaskName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleCreateTask} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={dialogModifyOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{`Modificar tarea ${taskData.name}`}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de tarea"
              value={taskName}
              onChange={this.handleChangeTaskName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {(taskData.collaborator || taskData.collaborator_id) && (
              <Button onClick={this.handleRemoveTaskCollaborator} color="secondary">
                Borrar al colaborador
              </Button>
            )}
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleModifyTaskName} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={dialogCreatePhaseOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Crear fase</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Nombre de fase"
              value={phaseName}
              onChange={this.handleChangePhaseName}
              fullWidth
              style={{ marginBottom: 30 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="age-simple">Agregar fase antes de:</InputLabel>
              <Select
                value={selectedPhaseId}
                onChange={event => this.setState({ selectedPhaseId: event.target.value })}
              >
                {project.phases.map(({ name }, phaseIndex) => <MenuItem value={phaseIndex}>{name}</MenuItem>)}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleCreatePhase} variant="contained" color="primary">
              Crear fase
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ProjectTasks.contextType = AppContext;
