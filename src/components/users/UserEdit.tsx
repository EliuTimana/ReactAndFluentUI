import { Stack, TextField } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Api } from '../../Api';
import { User } from '../../models';

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  userId: number;
}

export const UserEdit = (props: Props) => {
  const [userId, setUserId] = useState<number>();
  const [user, setUser] = useState<User>();

  const fetchUser = () => {
    setUserId(parseInt(props.match.params.id, 0));
    fetch(`${Api.Users}/${userId}`)
        .then(response => response.json())
        .then((data: User) => {
          setUser(data);
        });
  }
  useEffect(() => {
    fetchUser();
  })

  return <div>
    <Stack tokens={{childrenGap: 15}}>
      <TextField label="Name" value={user?.name}/>
      <TextField label="Username" value={user?.username}/>
      <TextField label="Email" value={user?.email} type="email"/>
      <TextField label="Phone" value={user?.phone} type="tel"/>
      <TextField label="Website" value={user?.website} type="url"/>
    </Stack>
  </div>;

}
