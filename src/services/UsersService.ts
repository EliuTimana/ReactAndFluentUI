import { User } from '../models';

export class UsersService {
  public static getAllUsers(): Promise<User[]> {
    return new Promise(async resolve => {
      await this.delayOperation();
      const local = localStorage.getItem('users');
      resolve(local ? JSON.parse(local) : []);
    });
  }

  public static async getUser(id: number): Promise<User | null> {
    await this.delayOperation();
    const users = await this.getAllUsers();
    const user = users.find(x => x.id === id);
    return user ? user : null;
  }

  public static async updateUser(user: User) {
    await this.delayOperation();
    let users = await this.getAllUsers();
    const index = users.findIndex(x => x.id === user.id);
    users[index] = user;
    this.saveInLocal(users);
  }

  public static async saveUser(user: User) {
    await this.delayOperation();
    let users = await this.getAllUsers();
    user.id = users.length === 0 ? 1 : Math.max(...users.map(x => x.id)) + 1;
    users.push(user);
    this.saveInLocal(users);
  }

  public static async delete(userId: number) {
    await this.delayOperation();
    let users = await this.getAllUsers();
    users = users.filter(x => x.id !== userId);
    this.saveInLocal(users);
  }

  private static saveInLocal(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private static async delayOperation(duration: number = 1500) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, duration);
    })
  }
}
