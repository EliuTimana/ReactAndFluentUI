import { DetailsList, IColumn, Persona, PersonaSize, SelectionMode } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../models';
import { Api } from '../../Api';

export const UserList = () => {
  const [items, setItems] = useState<User[]>([]);
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
      minWidth: 200, key: 'address', name: 'Address', onRender(item?: User) {
        return `${item?.address.street} ${item?.address.suite}`;
      }
    },
    {
      minWidth: 100, key: 'edit', name: '', onRender(item?: User) {
        return <Link to={`/users/${item?.id}/edit`}>Edit {item?.id}</Link>;
      }, className: 'ms-textAlignCenter',
    },
  ];

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = () => {
    fetch(Api.Users)
        .then(response => response.json())
        .then((data: User[]) => {
          setItems(data);
          console.log(data);
        });
  }

  return (
      <DetailsList items={items} columns={columns} selectionMode={SelectionMode.none}/>
  );

}
