/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AppContext from './context';

import Home from './pages/home';
import Profile from './pages/profile';
import Projects from './pages/projects';
import CreateProject from './pages/createProject';
import ProjectOfUser from './pages/projects/byUser';
import Project from './pages/projects/project';

import Header from './layout/header';

import './app.scss';

export default class App extends Component {
  state = {
    user: null,
    showLeftMenu: false,
  };

  componentDidMount() {
    fetch('/api/users/1')
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  toggleDrawer = open => (event) => {
    event.stopPropagation();
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ showLeftMenu: open });
  };

  render() {
    const { username, showLeftMenu } = this.state;
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
                  <ListItemText primary="home" />
                </ListItem>
              </Link>
              <Link to="/me" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemText primary="Mi perfil" />
                </ListItem>
              </Link>
              <Link to="/me/projects" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemText primary="Mis proyectos" />
                </ListItem>
              </Link>
              <Link to="/projects" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemText primary="Proyectos" />
                </ListItem>
              </Link>
              <Link to="/me/projects/create" onClick={this.toggleDrawer(false)}>
                <ListItem button>
                  <ListItemText primary="Crear Proyecto" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <div role="presentation" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
            <Header />
            <main className="main">
              <Route path="/" component={Home} exact />
              <Route path="/me" component={Profile} exact />
              <Route path="/me/projects" component={ProjectOfUser} exact />
              <Route path="/me/projects/create" component={CreateProject} exact />
              <Route path="/profile/:id" component={Profile} exact />
              <Route path="/profile/:id/projects" component={ProjectOfUser} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/projects/:id" component={Project} exact />
            </main>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}
