import { Stack, TextField } from '@fluentui/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Api } from '../../Api';
import { User } from '../../models';

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  userId: number;
}

interface State {
  user?: User;
}

export class UserEdit extends React.Component<Props, State> {
  private userId?: number;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  fetchUser() {
    this.userId = parseInt(this.props.match.params.id, 0);
    fetch(`${Api.Users}/${this.userId}`)
        .then(response => response.json())
        .then((data: User) => {
          this.setState({
            user: data
          })
        });
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return <div>
      <Stack tokens={{childrenGap: 15}}>
        <TextField label="Name" value={this.state.user?.name}/>
        <TextField label="Username" value={this.state.user?.username}/>
        <TextField label="Email" value={this.state.user?.email} type="email"/>
        <TextField label="Phone" value={this.state.user?.phone} type="tel"/>
        <TextField label="Website" value={this.state.user?.website} type="url"/>
      </Stack>
    </div>;
  }
}
