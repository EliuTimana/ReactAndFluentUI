import { User } from '../models';

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

  public static async saveUser(user: User) {
    let users = await this.getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
