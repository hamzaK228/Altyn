import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository.js';
import { RegisterDto, LoginDto } from './auth.schema.js';
import { ApiError } from '../../lib/errors.js';

export class AuthService {
  constructor(private authRepo: AuthRepository) {}

  async register(data: RegisterDto) {
    const existing = await this.authRepo.findByEmail(data.email);
    if (existing) {
      throw new ApiError(400, 'Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.authRepo.create({
      ...data,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async login(data: LoginDto) {
    const user = await this.authRepo.findByEmail(data.email);
    if (!user) {
      throw new ApiError(401, 'Неверные учетные данные');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new ApiError(401, 'Неверные учетные данные');
    }

    return this.generateToken(user);
  }

  async getMe(id: string) {
    const user = await this.authRepo.findById(id);
    if (!user) {
      throw new ApiError(404, 'Пользователь не найден');
    }
    return user;
  }

  private generateToken(user: any) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
