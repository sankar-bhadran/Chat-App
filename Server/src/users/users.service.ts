import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { LoginDTO } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { UserModel } from './dto/user.model';
import { GetAllUsersResponse } from './dto/get-all-users-response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserInput.email,
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);

    // Replace plain password with hashed password
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async login(loginDto: LoginDTO): Promise<LoginResponse> {
    const { email, password } = loginDto;

    // Find user by email directly from the database
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      return { status: false, message: 'Invalid email or password' };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: false, message: 'Invalid email or password' };
    }

    // Successful login response
    return {
      status: true,
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
      },
    };
  }

  async getAllUsersExceptCurrent(
    userId: string,
  ): Promise<GetAllUsersResponse[]> {
    const users = await this.userModel.find({ _id: { $ne: userId } }).exec();

    return users.map((user) => ({
      id: user._id as unknown as string,
      username: user.username,
      email: user.email,
    }));
  }
}
