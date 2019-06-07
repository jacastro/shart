/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

import ModifyProjectPage from '.';

export default class EditProjectPage extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/projects/${match.params.id}`)
      .then(({ data }) => {
        this.setState({ data });
      })
      .catch(() => {
        window.location.replace('/me/projects');
      });
  }

  render() {
    const { data } = this.state;
    return data != null ? <ModifyProjectPage data={data} /> : <CircularProgress />;
  }
}

EditProjectPage.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};