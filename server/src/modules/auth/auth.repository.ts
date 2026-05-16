import { store, UserRecord } from '../../lib/store.js';

export class AuthRepository {
  async findByEmail(email: string): Promise<UserRecord | undefined> {
    return store.users.find(u => u.email === email);
  }

  async findById(id: string): Promise<Omit<UserRecord, 'password'> | undefined> {
    const user = store.users.find(u => u.id === id);
    if (!user) return undefined;
    const { password, ...rest } = user;
    return rest;
  }

  async create(data: { email: string; password: string; name: string }): Promise<UserRecord> {
    const user: UserRecord = {
      id: store.genId(),
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'user',
      createdAt: new Date(),
    };
    store.users.push(user);
    return user;
  }

  async updateProfile(id: string, data: { name?: string; email?: string }): Promise<Omit<UserRecord, 'password'> | undefined> {
    const user = store.users.find(u => u.id === id);
    if (!user) return undefined;
    
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    
    const { password, ...rest } = user;
    return rest;
  }
}
