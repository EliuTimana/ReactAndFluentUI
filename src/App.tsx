import React from 'react';
import './App.scss';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { UserList } from './components/users/UserList';
import { Home } from './Home';
import { Fabric, INavLink, INavLinkGroup, initializeIcons, Nav } from '@fluentui/react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { UserEdit } from './components/users/UserEdit';

function App() {
  const history = useHistory();
  const onClick = (e?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    e?.preventDefault();
    history.push(item!!.url);
  }
  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {name: 'Home', url: '/', onClick},
        {name: 'Users', url: '/users', onClick},
      ]
    }
  ];
  initializeIcons();
  return (
      <Fabric>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
              <Nav groups={navLinkGroups}/>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
              <Switch>
                <Route path="/users/:id/edit" component={UserEdit}/>
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
  );
}

export default withRouter(App);
