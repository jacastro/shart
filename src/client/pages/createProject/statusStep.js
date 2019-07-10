import React, { useContext } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
        <Subtitle title="Fechas estimadas" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            id="startDate"
            label="Inicio"
            value={values.start_date}
            onChange={handleChange('start_date')}
            format="dd/MM/yyyy"
            margin="normal"
            inputVariant="outlined"
            invalidDateMessage="Formato de fecha incorrecto"
            required
            style={{ width: '48%' }}
            animateYearScrolling
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            id="endDate"
            label="Fin"
            value={values.end_date}
            onChange={handleChange('end_date')}
            format="dd/MM/yyyy"
            margin="normal"
            inputVariant="outlined"
            invalidDateMessage="Formato de fecha incorrecto"
            required
            style={{ width: '48%' }}
            animateYearScrolling
          />
        </MuiPickersUtilsProvider>
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
            required
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
