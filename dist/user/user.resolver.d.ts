import { UserService } from './user.service';
import { CreateUserResponse } from './entities/user-entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<CreateUserResponse>;
    updateUser(updateUserInput: UpdateUserInput): Promise<CreateUserResponse>;
}
