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
    value: 'handicraft',
    label: 'Artesanías',
  },
  {
    value: 'picture',
    label: 'Cuadros',
  },
  {
    value: 'trees',
    label: 'Árboles',
  },
];

export const phases = [
  {
    id: 'init',
    name: 'Inicio',
  },
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
  {
    id: 'final',
    name: 'Fin',
  },
];

export const statuses = [
  {
    id: 'todo',
    name: 'Planificada',
  },
  {
    id: 'in_progress',
    name: 'En progreso',
  },
  {
    id: 'done',
    name: 'Terminada',
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

export const getTagName = (value) => {
  const myTag = tags.find(tag => tag.value === value);
  return myTag ? myTag.label : value;
};
