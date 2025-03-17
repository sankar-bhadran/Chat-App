import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginResponse } from './dto/login-response';
import { LoginDTO } from './dto/login-input';
import { GetAllUsersResponse } from './dto/get-all-users-response.dto';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello GraphQL!';
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginDTO,
  ): Promise<LoginResponse> {
    const response = await this.usersService.login(loginInput);

    return {
      status: response.status,
      message: response.message,
      user: response.user, // ✅ Return user details
    };
  }

  @Query(() => [GetAllUsersResponse])
  async getAllUsersExceptCurrent(
    @Args('userId') userId: string,
  ): Promise<GetAllUsersResponse[]> {
    return this.usersService.getAllUsersExceptCurrent(userId);
  }
}
