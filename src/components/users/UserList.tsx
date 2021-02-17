import {
  CommandBar,
  DetailsList,
  DialogType,
  IColumn,
  ICommandBarItemProps,
  IconButton,
  IDialogContentProps,
  Persona,
  PersonaSize,
  SelectionMode
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../models';
import Logo from '../../logo.svg';
import { UsersService } from '../../services/UsersService';
import { UserEdit } from './UserEdit';
import { Alert } from '../common/Alert';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const columns: IColumn[] = [
    {
      minWidth: 200, key: 'name', name: 'Name',
      onRender(item?: User) {
        return <Persona size={PersonaSize.size24} text={item?.name}/>
      }
    },
    {minWidth: 200, key: 'email', name: 'Email', fieldName: 'email'},
    {minWidth: 200, key: 'website', name: 'Website', fieldName: 'website'},
    {
      minWidth: 200, key: 'phone', name: 'Phone', onRender(item?: User) {
        return item?.phone;
      }
    },
    {
      minWidth: 100, key: 'actions', name: '', onRender(item?: User) {
        return <IconButton
            menuIconProps={{iconName: 'MoreVertical'}}
            menuProps={{
              items: [
                {
                  key: 'edit',
                  text: 'Edit',
                  onClick: () => openModal(item?.id),
                },
                {
                  key: 'delete',
                  text: 'Delete',
                  onClick: () => {
                    setUserId(item?.id!);
                    setModalDeleteVisible(true);
                  },
                },
              ],
            }}/>
            ;
      }, className: 'ms-textAlignCenter',
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await UsersService.getAllUsers();
    if (data.length === 0) {
      const newUser = {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        companyId: 1,
        phone: '988998895',
        website: 'https://www.test.pe',
        avatar: Logo
      };
      await UsersService.saveUser(newUser);
      setUsers([newUser]);
    } else {
      setUsers(data);
    }
  }
  const openModal = (id: number | null = null) => {
    setUserId(id);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
    fetchUsers();
  }

  const handleConfirmDelete = async () => {
    try {
      if (!userId) return;
      setDeleting(true);

      await UsersService.delete(userId);
      setDeleting(false);
      setModalDeleteVisible(false);
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  }

  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'new', text: 'New', iconProps: {iconName: 'Add'}, onClick: () => {
        openModal();
      }
    }
  ]

  const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Delete?',
    closeButtonAriaLabel: 'Close',
    subText: 'Do you want to delete this user?'
  };

  return (
      <>
        <CommandBar items={commandBarItems}/>
        <DetailsList items={users} columns={columns} selectionMode={SelectionMode.none}/>
        {modalVisible && <UserEdit userId={userId} onClose={() => handleCloseModal()}/>}
        {modalDeleteVisible && <Alert visible={modalDeleteVisible}
                                      dialogContentProps={dialogContentProps}
                                      loading={deleting}
                                      onCancel={() => setModalDeleteVisible(false)}
                                      onConfirm={handleConfirmDelete}/>}
      </>
  );
}
