import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { FormContext } from '.';
import Subtitle from '../../components/subtitle';

const StatusStep = () => {
  const { values, handleChangeValue } = useContext(FormContext);

  const handleChangeTask = (phaseIndex, taskIndex) => (event) => {
    if (taskIndex != null) {
      values.phases[phaseIndex].tasks[taskIndex] = event.target.value;
    } else {
      values.phases[phaseIndex].tasks.push('');
    }
    handleChangeValue('phases', values.phases);
  };

  return (
    <div style={{ textAlign: 'left' }}>
      {values.phases.map((phase, phaseIndex) => (
        <React.Fragment>
          <Subtitle title={phase.name} />
          {phase.tasks.map((task, taskIndex) => (
            <TextField
              label={`Descripción de la tarea Nº${taskIndex + 1} de ${phase.name}`}
              value={task}
              onChange={handleChangeTask(phaseIndex, taskIndex)}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          ))}
          <Button variant="outlined" onClick={handleChangeTask(phaseIndex)}>
            Agregar nueva tarea
          </Button>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusStep;
