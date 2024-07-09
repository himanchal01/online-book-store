import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import * as bcrypt from 'bcrypt';
import { CreateUserResponse, UserModel } from './entities/user-entity';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserInput: CreateUserInput): Promise<CreateUserResponse> {
        const { password } = createUserInput;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ ...createUserInput, password: hashedPassword, createdAt: Date.now(), updatedAt: Date.now() });
        const user = await createdUser.save()

        const userModel: UserModel = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        return {
            status: 200,
            message: "user created successfully",
            data: userModel
        }
    }

    async updateUser(updateUserInput: UpdateUserInput, userId: string): Promise<CreateUserResponse> {
        const user = await this.userModel.findById(userId)
        if (!user) {
            throw new UnauthorizedException("Unauthorized user")
        }
        if (updateUserInput.password) {
            updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
        }
        const userModel = await this.userModel.findByIdAndUpdate(userId,
            {
                $set: {
                    firstName: updateUserInput.firstName || user.firstName,
                    lastName: updateUserInput.lastName || user.lastName,
                    password: updateUserInput.password || user.password,
                    Image: updateUserInput.image || user.image,
                    updatedAt: Date.now()
                }

            }
            , { new: true });
        const userData: UserModel = {
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            email: userModel.email,
            image: userModel.image,
            createdAt: userModel.createdAt,
            updatedAt: userModel.updatedAt
        }
        return {
            status: 200,
            message: "user created successfully",
            data: userData
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }

    async validatePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }




}
