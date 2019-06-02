import React, { useContext } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { FormContext, phases } from '.';
import Subtitle from '../../components/subtitle';

const StatusStep = () => {
  const { values, handleChange, handleChangeCheckbox } = useContext(FormContext);

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Subtitle title="Sobre el estado actual" />
        <TextField
          select
          label="¿En qué etapa se encuentra tu proyecto?"
          value={values.current_phase}
          onChange={handleChange('current_phase')}
          margin="normal"
          variant="outlined"
          style={{ width: '48%' }}
        >
          {phases.map(({ id, name }) => (
            <MenuItem key={id} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          style={{ width: '48%' }}
          control={(
            <Checkbox
              checked={values.need_collaborations}
              onChange={handleChangeCheckbox('need_collaborations')}
              color="primary"
            />
          )}
          label="¿Vas a necesitar colaboradores?"
        />
      </Grid>
    </React.Fragment>
  );
};

export default StatusStep;
