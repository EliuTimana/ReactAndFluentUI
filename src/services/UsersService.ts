import { User } from "../models";

export class UsersService {
  public static getAllUsers(): Promise<User[]> {
    return new Promise(resolve => {
      const local = localStorage.getItem('users');
      resolve(local ? JSON.parse(local) : []);
    });
  }

  public static async getUser(id: number): Promise<User | null> {
    const users = await this.getAllUsers();
    const user = users.find(x => x.id === id);
    return user ? user : null;
  }

  public static async updateUser(user: User) {
    let users = await this.getAllUsers();
    const index = users.findIndex(x => x.id === user.id);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  public static async saveUser(user: User) {
    let users = await this.getAllUsers();
    user.id = users.length === 0 ? 1 : Math.max(...users.map(x => x.id)) + 1;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
