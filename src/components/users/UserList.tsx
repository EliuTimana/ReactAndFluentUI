import { DetailsList, IColumn, Persona, PersonaSize, SelectionMode } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../models';
import { Api } from '../../Api';

interface Props {

}

interface State {
    items: User[];
}

export class UserList extends React.Component<Props, State>{
    private columns: IColumn[] = [
        {
            minWidth: 200, key: 'name', name: 'Name',
            onRender(item?: User) {
                return <Persona size={PersonaSize.size24} text={item?.name} />
            }
        },
        { minWidth: 200, key: 'email', name: 'Email', fieldName: 'email' },
        { minWidth: 200, key: 'website', name: 'Website', fieldName: 'website' },
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
    constructor(props: Props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    private async fetchUsers() {
        fetch(Api.Users)
            .then(response => response.json())
            .then((data: User[]) => {
                this.setState({
                    items: data
                });
                console.log(data);
            });
    }

    render() {
        return (
            <DetailsList items={this.state.items} columns={this.columns} selectionMode={SelectionMode.none}/>
        );
    }
}
