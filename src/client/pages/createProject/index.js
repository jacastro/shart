import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import { phases } from '../../../config';

import AppContext from '../../context';

import ConfigStep from './configStep';
import StatusStep from './statusStep';
import TaskStep from './taskStep';

import './createProject.scss';

const steps = [
  {
    title: 'Sobre tu proyecto',
    content: <ConfigStep />,
    disableBack: true,
  },
  {
    title: 'Estado',
    content: <StatusStep />,
  },
  {
    title: 'Configurar Tareas',
    content: <TaskStep />,
    nextText: 'Crear proyecto'
  },
  {
    title: 'Finalizar',
    action: 'save',
    content: <LinearProgress />,
    disableNext: true
  }
];

export const FormContext = createContext();

const ModifyProjectPage = ({ data }) => {
  const { user } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    name: 'Mi nuevo proyecto',
    category: null,
    tags: [],
    images: [],
    description: '',
    start_date: '',
    end_date: '',
    need_collaborations: true,
    require_shipping: true,
    shipping_address: null,
    current_phase_num: null,
    current_phase: 'init',
    region: 'bsas',
    phases: phases.map(phase => ({ ...phase, tasks: [] })),
    ...data,
  });

  const stepData = steps[activeStep];

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target ? event.target.value : event });
  };

  const handleChangeCheckbox = name => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleChangeValue = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  function handleNext() {
    setActiveStep((prevActiveStep) => {
      const newStep = prevActiveStep + 1;
      const { action } = steps[newStep] || {};
      if (action === 'save') {
        axios.post(`https://uade-seminario-2-tpo.herokuapp.com/api/users/${user.id}/projects`, values)
          .then((response) => {
            console.log("response", response.data);
            handleNext();
          })
          .catch((error) => {
            console.log("response", error.response);
          });
      }
      return newStep;
    });
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className="create-prject">
      <Stepper activeStep={activeStep}>
        {steps.map((step) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={step.title} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep >= steps.length ? (
          <div>
            <Typography>
              ¡Tu proyecto ha sido creado correctamente!
            </Typography>
            <Button onClick={handleReset}>
              Mis proyectos
            </Button>
          </div>
        ) : (
          <div>
            <FormContext.Provider value={{ values, handleChange, handleChangeValue, handleChangeCheckbox }}>
              {steps[activeStep].content}
            </FormContext.Provider>
            <div className="actions">
              <Button
                disabled={stepData.disableBack || false}
                onClick={handleBack}
              >
                {stepData.backText || 'Atrás'}
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={stepData.disableNext || false}
              >
                {stepData.nextText || 'Continuar'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyProjectPage;
