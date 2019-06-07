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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { FormContext } from '.';
import { categories, tags } from '../../../config';
import Subtitle from '../../components/subtitle';

const ConfigStep = () => {
  const { values, handleChange, handleChangeValue } = useContext(FormContext);

  const handleChangeImage = imageIndex => (event) => {
    if (imageIndex != null) {
      values.images[imageIndex] = event.target.value;
    } else {
      values.images.push('');
    }
    handleChangeValue('images', values.images);
  };

  const handleDeleteImage = (imageIndex) => {
    values.images.splice(imageIndex, 1);
    handleChangeValue('images', values.images);
  };

  return (
    <div style={{ textAlign: 'left' }}>
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
      <React.Fragment>
        <Subtitle title="Imágenes" />
        {values.images.map((image, imageIndex) => (
          <TextField
            label={`Imagen Nº${imageIndex + 1}`}
            value={image}
            onChange={handleChangeImage(imageIndex)}
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Toggle password visibility"
                    onClick={() => handleDeleteImage(imageIndex)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
        <Button variant="outlined" onClick={handleChangeImage()}>
          Agregar nueva imagen
        </Button>
      </React.Fragment>
    </div>
  );
};

export default ConfigStep;
