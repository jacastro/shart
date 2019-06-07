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

  const end = values.end_date.substring(0, values.end_date.indexOf('T'));
  const start = values.start_date.substring(0, values.start_date.indexOf('T'));

  return (
    <React.Fragment>
      <Grid container justify="space-between">
        <Subtitle title="Fechas" />
        <TextField
          id="date"
          label="Inicio"
          type="date"
          value={start}
          onChange={handleChange('start_date')}
          margin="normal"
          variant="outlined"
          style={{ width: '48%' }}
        />
        <TextField
          id="date"
          label="Fin"
          type="date"
          value={end}
          onChange={handleChange('end_date')}
          margin="normal"
          variant="outlined"
          style={{ width: '48%' }}
        />
      </Grid>
      <Grid container justify="space-between">
        <Subtitle title="Envío" />
        <FormControlLabel
          style={{ width: '48%' }}
          control={(
            <Checkbox
              checked={values.require_shipping}
              onChange={handleChangeCheckbox('require_shipping')}
              color="primary"
            />
          )}
          label="¿Tu proyecto requiere envío a domicilio?"
        />
        {values.require_shipping && (
          <TextField
            label="Dirección de envío"
            value={values.shipping_address}
            onChange={handleChange('shipping_address')}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        )}
      </Grid>
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
          {values.phases.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
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
