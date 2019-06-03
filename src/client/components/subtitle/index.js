import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import './subtitle.scss';

const Subtitle = ({ title }) => (
  <Typography color="textSecondary" variant="h5" gutterBottom className="subtitle">
    {title}
  </Typography>
);

Subtitle.propTypes = {
  title: PropTypes.number.isRequired,
};

export default Subtitle;
