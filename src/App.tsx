import React from 'react';
import './App.scss';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { UserList } from './components/users/UserList';
import { Home } from './Home';
import { Fabric, INavLinkGroup, initializeIcons, Nav } from '@fluentui/react';
import 'office-ui-fabric-react/dist/css/fabric.css';

function App() {
  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {name: 'Home', url: '#/', key: 'home'},
        {name: 'Users', url: '#/users', key: 'users'},
      ]
    }
  ];

  initializeIcons();

  return (
      <HashRouter>
        <Fabric>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Nav groups={navLinkGroups}/>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                <Switch>
                  <Route path="/users" exact>
                    <UserList/>
                  </Route>
                  <Route path="/" exact>
                    <Home/>
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Fabric>
      </HashRouter>
  );
}

export default App;
