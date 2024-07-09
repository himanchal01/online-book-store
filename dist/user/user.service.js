"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserInput) {
        const { password } = createUserInput;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ ...createUserInput, password: hashedPassword, createdAt: Date.now(), updatedAt: Date.now() });
        const user = await createdUser.save();
        const userModel = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        return {
            status: 200,
            message: "user created successfully",
            data: userModel
        };
    }
    async updateUser(updateUserInput, userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("Unauthorized user");
        }
        if (updateUserInput.password) {
            updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
        }
        const userModel = await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                firstName: updateUserInput.firstName || user.firstName,
                lastName: updateUserInput.lastName || user.lastName,
                password: updateUserInput.password || user.password,
                Image: updateUserInput.image || user.image,
                updatedAt: Date.now()
            }
        }, { new: true });
        const userData = {
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            email: userModel.email,
            image: userModel.image,
            createdAt: userModel.createdAt,
            updatedAt: userModel.updatedAt
        };
        return {
            status: 200,
            message: "user created successfully",
            data: userData
        };
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(userId) {
        return this.userModel.findById(userId).exec();
    }
    async validatePassword(user, password) {
        return bcrypt.compare(password, user.password);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map