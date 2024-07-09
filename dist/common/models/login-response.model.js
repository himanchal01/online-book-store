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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = exports.LoginData = void 0;
const graphql_1 = require("@nestjs/graphql");
let LoginData = class LoginData {
};
exports.LoginData = LoginData;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "access_token", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginData.prototype, "refresh_token", void 0);
exports.LoginData = LoginData = __decorate([
    (0, graphql_1.ObjectType)()
], LoginData);
let LoginResponse = class LoginResponse {
};
exports.LoginResponse = LoginResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], LoginResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => LoginData),
    __metadata("design:type", LoginData)
], LoginResponse.prototype, "data", void 0);
exports.LoginResponse = LoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
//# sourceMappingURL=login-response.model.js.map