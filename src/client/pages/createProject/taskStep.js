import React, { useContext } from 'react';
import uuid from 'uuid/v1';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { FormContext, } from '.';
import Subtitle from '../../components/subtitle';

const StatusStep = () => {
  const { values, handleChangeValue } = useContext(FormContext);

  console.log(values);

  const handleChangeTask = (phaseIndex, taskIndex) => (event) => {
    const { tasks } = values.phases[phaseIndex];
    if (taskIndex != null) {
      tasks[taskIndex].name = event.target.value;
    } else {
      tasks.push({
        id: uuid(),
        name: '',
        status: 'todo',
      });
    }
    handleChangeValue('phases', values.phases);
  };

  const handleDeleteTask = (phaseIndex, taskIndex) => {
    values.phases[phaseIndex].tasks.splice(taskIndex, 1);
    handleChangeValue('phases', values.phases);
  };

  const num = values.phases.findIndex(phase => phase.id === values.current_phase);

  const phasesToShow = values.phases.filter((phase, index) => index >= num);

  return (
    <div style={{ textAlign: 'left' }}>
      {phasesToShow.map((phase, phaseIndex) => (
        <React.Fragment>
          <Subtitle title={phase.name} />
          {phase.tasks.map((task, taskIndex) => (
            <TextField
              label={`Descripción de la tarea Nº${taskIndex + 1} de ${phase.name}`}
              value={task.name}
              onChange={handleChangeTask(phaseIndex + num, taskIndex)}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={() => handleDeleteTask(phaseIndex + num, taskIndex)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
          <Button variant="outlined" onClick={handleChangeTask(phaseIndex + num)}>
            Agregar nueva tarea
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusStep;
