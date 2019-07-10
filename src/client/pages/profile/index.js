import React from 'react';
import Profile from '../../components/profile';
import Button from '@material-ui/core/Button';
import AppContext from '../../context';
import { get } from '../../services';
import { useCookies } from 'react-cookie';
import { CookiesProvider, withCookies } from 'react-cookie';

class ProfilePage extends React.Component {
  state = {
    userDetail: null,
  };

  componentDidMount() {
    const { user } = this.context;
    get(`/users/${user.id}`)
      .then(response => {
        const data = response.data;
        this.setState({ userDetail: data });
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render (){
    const { userDetail } = this.state;
    const { user } = this.context;

    return (
      <CookiesProvider>
        <React.Fragment>
          <div className="user-profile">
            { userDetail ? <Profile me={userDetail.me} email={userDetail.email} user_name={userDetail.user_name} myProfile {...userDetail.id === user.id} /> : null }
          </div>
        </React.Fragment>
      </CookiesProvider>
    );
  };
}

ProfilePage.contextType = AppContext;

export default withCookies(ProfilePage);
