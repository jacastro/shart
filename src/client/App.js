/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppContext from './context';

import Home from './pages/home';
import Profile from './pages/profile';
import Projects from './pages/projects';
import CreateProject from './pages/createProject';
import EditProjectPage from './pages/createProject/editProject';
import ProjectOfUser from './pages/projects/byUser';
import Project from './pages/projects/project';

import Header from './layout/header';

import { get } from './services';

import './app.scss';

export default class App extends Component {
  state = {
    user: null,
    showLeftMenu: false,
  };

  componentDidMount() {
    get('/users/1')
      .then(({ data }) => {
        this.setState({ user: data });
      });
  }

  toggleDrawer = open => (event) => {
    event.stopPropagation();
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ showLeftMenu: open });
  };

  render() {
    const { user, showLeftMenu } = this.state;
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          toggleDrawer: this.toggleDrawer,
        }}
      >
        <Router>
          <Drawer open={showLeftMenu} onClose={this.toggleDrawer(false)}>
            <List className="left-menu">
              <Link to="/" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItem>
              </Link>
              <Link to="/projects" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemIcon>
                    <ViewModuleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Proyectos" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/me" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Mi perfil" />
                </ListItem>
              </Link>
              <Link to="/me/projects" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemIcon>
                    <WorkIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Mis proyectos" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/me/projects/create" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemIcon>
                    <AddCircleIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary="Crear Proyecto" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <div role="presentation" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
            <Header />
            <main className="main">
              {user != null ? (
                <React.Fragment>
                  <Route path="/" component={Home} exact />
                  <Route path="/me" component={Profile} exact />
                  <Route path="/me/projects" component={ProjectOfUser} exact />
                  <Route path="/me/projects/create" component={CreateProject} exact />
                  <Route path="/me/projects/modify/:id" component={EditProjectPage} exact />
                  <Route path="/profile/:id" component={Profile} exact />
                  <Route path="/profile/:id/projects" component={ProjectOfUser} exact />
                  <Route path="/projects" component={Projects} exact />
                  <Route path="/projects/:id" component={Project} exact />
                </React.Fragment>
              ) : <CircularProgress />}
            </main>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}
