import React from 'react';
import uuid from 'uuid/v1';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { phases, statuses } from '../../../config';

import { get, post, put } from '../../services';

import './styles.scss';

export default class ProjectTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      dialogCreateOpen: false,
      dialogModifyOpen: false,
      selectedPhaseId: 0,
      selectedStatusId: 0,
      selectedTaskId: 0,
      taskName: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeTaskName = this.handleChangeTaskName.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleModifyTask = this.handleModifyTask.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    get(`/projects/${match.params.id}`)
      .then(({ data: project }) => {
        const projectPhases = project.phases.length > 0 ? project.phases : phases.map(phase => ({ ...phase, tasks: [] }));
        this.setState({
          project: {
            ...project,
            phases: projectPhases,
          }
        });
        if (project.phases.length === 0) {
          put(`/projects/${project.id}`, { phases: projectPhases });
        }
      });
  }

  handleClickCreateOpen(selectedPhaseId, selectedStatusId) {
    this.setState({ dialogCreateOpen: true, selectedPhaseId, selectedStatusId });
  }

  handleClickModifyOpen(selectedPhaseId, selectedTaskId) {
    const { project } = this.state;

    const phaseData = project.phases[selectedPhaseId];
    const taskData = phaseData.tasks[selectedTaskId];

    this.setState({ dialogModifyOpen: true, taskName: taskData.name, selectedPhaseId, selectedTaskId });
  }

  handleChangeTaskName(event) {
    this.setState({ taskName: event.target.value });
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

  handleModifyTask() {
    const { project, selectedPhaseId, selectedTaskId, taskName } = this.state;

    const phaseData = project.phases[selectedPhaseId];
    const taskData = phaseData.tasks[selectedTaskId];
    taskData.name = taskName;

    this.setState({ project, dialogModifyOpen: false, taskName: null });

    put(`/projects/${project.id}/phases/${phaseData.id}/tasks/${taskData.id}`, taskData);
  }

  render() {
    const { project, dialogCreateOpen, dialogModifyOpen, taskName, selectedPhaseId, selectedStatusId } = this.state;

    if (project == null) {
      return <CircularProgress />;
    }

    if (project.phases.length === 0) {
      return <h4>Tu proyecto no tiene fases definidas.</h4>;
    }

    const phaseData = project.phases[selectedPhaseId];
    const statusData = statuses[selectedStatusId];

    return (
      <div>
        <Typography gutterBottom variant="h2" color="textSecondary" align="left">{project.name}</Typography>
        <div>
          {project.phases.map(({ id, name, tasks }, phaseId) => (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={id}
                id={id}
              >
                <Typography>{name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={2}>
                  {statuses.map((status, statusIndex) => (
                    <Grid item xs={4}>
                      <div className="tasks-col">
                        <Typography gutterBottom className="tasks-col-title" color="textSecondary" variant="subtitle2" align="left">
                          {status.name}
                        </Typography>
                        {tasks.map((task, taskIndex) => (
                          task.status === status.id ? (
                            <Paper className="tasks-card">
                              <Typography onClick={() => this.handleClickModifyOpen(phaseId, taskIndex)}>{task.name}</Typography>
                              {statusIndex !== 0 && (
                                <Fab size="small" aria-label="Add" className="tasks-card-move-left" onClick={() => this.handleMove(phaseId, taskIndex, statusIndex - 1)}>
                                  <ArrowBack />
                                </Fab>
                              )}
                              {statusIndex !== (statuses.length - 1) && (
                                <Fab size="small" aria-label="Add" className="tasks-card-move-right" onClick={() => this.handleMove(phaseId, taskIndex, statusIndex + 1)}>
                                  <ArrowForward />
                                </Fab>
                              )}
                            </Paper>
                          ) : null
                        ))}
                        <Fab color="primary" aria-label="Add" className="tasks-add" onClick={() => this.handleClickCreateOpen(phaseId, statusIndex)}>
                          <AddIcon />
                        </Fab>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
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
          <DialogTitle id="form-dialog-title">{`Modificar tarea ${phaseData.name}`}</DialogTitle>
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
            <Button onClick={this.handleModifyTask} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
