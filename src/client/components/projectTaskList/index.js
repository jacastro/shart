import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AppContext from '../../context';

const ProjectTaskList = ({ id, name, tasks }) => {
  const { user } = useContext(AppContext);

  return (
    <ExpansionPanel square="true" key={`panel-${id}`} id={`panel-${id}`} disabled={tasks.length === 0}>
      <ExpansionPanelSummary aria-controls="panel1d-content" expandIcon={<ExpandMore />}>
        <ViewListIcon color="disabled" />
          <Typography variant="button">
            {name}
            <Typography variant="overline" color="textSecondary" className="phase-total-tasks">
              (
              {tasks.length > 1 || tasks.length === 0 ? `${tasks.length} tareas` : `${tasks.length} tarea`}
              )
            </Typography>
          </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List dense disablePadding component="div">
          {tasks.map(task => (
            <ListItem divider key={task.id} button>
              <ListItemIcon>
                {task.status === 'in_progress'
                && <AssignmentIndIcon color="secondary" />}
                {task.status === 'todo'
                && <AssignmentIcon color="primary" />}
                {task.status === 'done'
                && <AssignmentTurnedInIcon color="disabled" />}
              </ListItemIcon>
              <ListItemText primary={task.name} secondary={task.status} />
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ProjectTaskList.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

ProjectTaskList.defaultProps = {
  name: 'Fase',
  tasks: [],
};

export default ProjectTaskList;
