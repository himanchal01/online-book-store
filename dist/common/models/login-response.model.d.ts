export declare class LoginData {
    email: string;
    userId: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    access_token: string;
    refresh_token: string;
}
export declare class LoginResponse {
    status: number;
    message: string;
    data: LoginData;
}
