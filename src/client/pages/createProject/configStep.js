import React, { useContext } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import { FormContext, categories, tags } from '.';
import Subtitle from '../../components/subtitle';

const ConfigStep = () => {
  const { values, handleChange, handleChangeCheckbox } = useContext(FormContext);

  return (
    <React.Fragment>
      <Subtitle title="Información principal" />
      <TextField
        label="Nombre"
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Descripción"
        value={values.description}
        onChange={handleChange('description')}
        margin="normal"
        variant="outlined"
        fullWidth
        multiline
      />
      <Grid container justify="space-between">
        <TextField
          select
          label="Categorías"
          value={values.category}
          onChange={handleChange('category')}
          margin="normal"
          variant="outlined"
          style={{ width: '48%' }}
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl variant="outlined" margin="normal" style={{ width: '48%' }}>
          <InputLabel htmlFor="select-multiple">Tags</InputLabel>
          <Select
            multiple
            margin="normal"
            value={values.tags}
            onChange={handleChange('tags')}
            input={<OutlinedInput />}
            renderValue={selected => (
              <div className="tags">
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {tags.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                <Checkbox checked={values.tags.indexOf(value) > -1} />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid container justify="space-between">
        <Subtitle title="Fechas" />
        <TextField
          id="date"
          label="Inicio"
          type="date"
          value={values.start}
          onChange={handleChange('start')}
          margin="normal"
          variant="outlined"
          style={{ width: '48%' }}
        />
        <TextField
          id="date"
          label="Fin"
          type="date"
          value={values.end}
          onChange={handleChange('end')}
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
    </React.Fragment>
  );
};

export default ConfigStep;
