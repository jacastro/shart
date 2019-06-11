/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import { get } from '../../services';

import ModifyProjectPage from '.';

const formatDate = date => (date.includes('T') ? date.substring(0, date.indexOf('T')) : date);

export default class EditProjectPage extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    const { match } = this.props;
    get(`/projects/${match.params.id}`)
      .then(({ data }) => {
        this.setState({
          data: {
            ...data,
            end_date: formatDate(data.end_date),
            start_date: formatDate(data.start_date),
          }
        });
      })
      .catch((error) => {
        window.location.replace('/');
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
