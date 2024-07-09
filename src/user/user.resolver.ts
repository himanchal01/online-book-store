import { Resolver, Mutation, Args, GqlArgumentsHost } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserResponse } from './entities/user-entity';
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UseGuards } from '@nestjs/common';


@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => CreateUserResponse)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<CreateUserResponse> {
        return await this.userService.createUser(createUserInput);

    }

    @UseGuards(GqlArgumentsHost)
    @Mutation(() => CreateUserResponse)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<CreateUserResponse> {
        return await this.userService.updateUser(updateUserInput, updateUserInput.id);

    }
}
