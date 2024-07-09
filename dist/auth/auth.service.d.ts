import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
import { LoginResponse } from 'src/common/models/login-response.model';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(email: string, password: string): Promise<LoginResponse>;
}
