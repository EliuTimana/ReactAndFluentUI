import { DetailsList, IColumn, Persona, PersonaSize } from '@fluentui/react';
import React from 'react';
import { User } from '../../models';

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
        fetch('https://jsonplaceholder.typicode.com/users')
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
            <DetailsList items={this.state.items} columns={this.columns} />
        );
    }
}