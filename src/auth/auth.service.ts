// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
import { LoginData, LoginResponse } from 'src/common/models/login-response.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findUserByEmail(email);
        if (user && await this.userService.validatePassword(user, password)) {
            return user;
        }
        return null;
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user._id };
        const access_token = this.jwtService.sign(payload, { expiresIn: '1h' })
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' })
        const data: LoginData = {
            email: user.email,
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: new Date(user.createdAt).toISOString(),
            updatedAt: new Date(user.updatedAt).toISOString(),
            access_token: access_token,
            refresh_token: refresh_token
        };
        const response: LoginResponse = {
            status: 200,
            message: "user logged in successfully",
            data,
        }
        return response
    }
}
