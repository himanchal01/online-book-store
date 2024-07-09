import { AuthService } from './auth.service';
import { LoginResponse } from 'src/common/models/login-response.model';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<LoginResponse>;
}
