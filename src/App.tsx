import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { UserList } from './components/users/UserList';
import { Home } from './Home';
import { Fabric, initializeIcons } from '@fluentui/react';

function App() {
  initializeIcons();
  return (
    <Router>
      <Fabric>
        <nav>
          <Link to="/">Index</Link>
          <Link to="/users">Users</Link>
        </nav>
        <Switch>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Fabric>
    </Router>
  );
}

export default App;
