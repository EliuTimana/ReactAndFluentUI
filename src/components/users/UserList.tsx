import {
  CommandBar,
  DetailsList,
  IColumn,
  ICommandBarItemProps,
  Link,
  Persona,
  PersonaSize,
  SelectionMode
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../models';
import Logo from '../../logo.svg';
import { UsersService } from '../../services/UsersService';
import { UserEdit } from './UserEdit';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const columns: IColumn[] = [
    {
      minWidth: 200, key: 'name', name: 'Name',
      onRender(item?: User) {
        return <Persona size={PersonaSize.size24} text={item?.name} imageUrl={item?.avatar}/>
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
      minWidth: 100, key: 'edit', name: '', onRender(item?: User) {
        return <Link onClick={() => openModal(item?.id)}>Edit</Link>;
      }, className: 'ms-textAlignCenter',
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await UsersService.getAllUsers();
    console.log(data)
    if (data.length === 0) {
      const newUser = {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        companyId: 1,
        phone: '988998895',
        website: 'www.test.pe',
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

  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'new', text: 'New', iconProps: {iconName: 'Add'}, onClick: () => {
        openModal();
      }
    }
  ]

  return (
      <>
        <CommandBar items={commandBarItems}/>
        <DetailsList items={users} columns={columns} selectionMode={SelectionMode.none}/>
        <UserEdit visible={modalVisible} userId={userId} onClose={() => setModalVisible(false)}/>
      </>
  );
}