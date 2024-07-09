export declare class UserModel {
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateUserResponse {
    status: number;
    message: string;
    data: UserModel;
}
