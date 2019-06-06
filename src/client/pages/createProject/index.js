import React, { createContext, useContext, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import AppContext from '../../context';

import ConfigStep from './configStep';
import StatusStep from './statusStep';
import TaskStep from './taskStep';

import './createProject.scss';

export const categories = [
  {
    value: 'toys',
    label: 'Juguetes',
  },
  {
    value: 'gift',
    label: 'Regalos',
  },
  {
    value: 'handicrafts',
    label: 'Artesanías',
  },
  {
    value: 'picture',
    label: 'Cuadros',
  },
];

export const tags = [
  ...categories,
  {
    value: 'star-wars',
    label: 'Star Wars',
  },
  {
    value: 'fun',
    label: 'Diversión',
  },
];

export const phases = [
  {
    id: 'design',
    name: 'Diseño',
  },
  {
    id: 'development',
    name: 'Desarrollo',
  },
  {
    id: 'decoration',
    name: 'Decoración',
  },
  {
    id: 'ship',
    name: 'Envío',
  },
];


const steps = [
  {
    title: 'Sobre tu proyecto',
    content: <ConfigStep />,
  },
  {
    title: 'Estado actual',
    content: <StatusStep />,
  },
  {
    title: 'Configurar Tareas',
    content: <TaskStep />,
  },
  {
    title: 'Finalizar',
    content: <LinearProgress />,
  }
];

export const FormContext = createContext();

const CreateProjectPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    name: 'Mi nuevo proyecto',
    category: null,
    tags: [],
    description: '',
    start: null,
    end: null,
    need_collaborations: true,
    require_shipping: true,
    shipping_address: null,
    current_phase_num: null,
    current_phase: 'design',
    region: 'bsas',
    phases: [
      {
        id: 'design',
        name: 'Diseño',
        tasks: []
      },
      {
        id: 'development',
        name: 'Desarrollo',
        tasks: []
      },
      {
        id: 'decoration',
        name: 'Decoración',
        tasks: []
      },
      {
        id: 'ship',
        name: 'Envío',
        tasks: []
      },
    ]
  });

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
      if (prevActiveStep === 2) {
        setTimeout(() => { handleNext(); }, 1000);
      }
      return prevActiveStep + 1;
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
        {steps.map((step, index) => {
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
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Atrás
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                {activeStep > steps.length - 3 ? 'Crear proyecto' : 'Continuar'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectPage;
