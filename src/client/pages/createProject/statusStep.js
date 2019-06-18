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
        <Subtitle title="Fechas" />
        <TextField
          id="date"
          label="Inicio"
          type="date"
          value={values.start_date}
          onChange={handleChange('start_date')}
          margin="normal"
          variant="outlined"
          style={{ width: '48%' }}
        />
        <TextField
          id="date"
          label="Fin"
          type="date"
          value={values.end_date}
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
        <Subtitle title="Sobre tus colaboradores" />
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
