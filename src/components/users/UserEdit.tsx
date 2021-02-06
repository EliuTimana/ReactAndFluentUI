import { IconButton, Modal, PrimaryButton, Stack, TextField } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../models';
import { UsersService } from '../../services/UsersService';

/*interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  userId: number;
}*/
interface Props {
  userId: number | null;
  visible: boolean;

  onClose(): void;
}

export const UserEdit = ({userId, visible, onClose}: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    if (userId) {
      const data = await UsersService.getUser(userId);
      setUser(data);
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);


  return <div>
    <Modal isOpen={visible}>
      <div className="d-flex justify-content-between p-3">
        <span className="ms-font-xl-plus">{userId === null ? 'Create User' : 'Edit User'}</span>
        <IconButton iconProps={{iconName: 'Cancel'}} onClick={() => onClose()}/>
      </div>
      <div className="p-3">
        <Stack tokens={{childrenGap: 15}}>
          <TextField label="Name" value={user?.name}/>
          <TextField label="Email" value={user?.email} type="email"/>
          <TextField label="Website" value={user?.website} type="url"/>
          <TextField label="Phone" value={user?.phone} type="tel"/>
          <PrimaryButton text="Save"/>
        </Stack>
      </div>
    </Modal>
  </div>;

}
