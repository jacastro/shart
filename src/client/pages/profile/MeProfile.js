import React from 'react';
import Profile from '../../components/profile';
import Button from '@material-ui/core/Button';
import AppContext from '../../context';
import Typography from '@material-ui/core/Typography';
import { get } from '../../services';

class MeProfile extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    const { match } = this.props;
    get(`/users/${match.params.id}`)
      .then(response => {
        const data = response.data;
        this.setState({ user: data });
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  logout = () => {
    removeCookie('userId', { path: '/' });
    location.reload();
  };
  render (){
    const { user } = this.state;
    return (
      <div>
        { user ? <Profile me={user.me} email={user.email} user_name={user.user_name} /> : null }
      </div>
    );
  };
}

MeProfile.contextType = AppContext;
export default MeProfile;
