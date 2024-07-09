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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const image_service_1 = require("./image.service");
const graphql_upload_1 = require("graphql-upload");
let ImageResolver = class ImageResolver {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async uploadImage(file) {
        const uploadResult = await this.imageService.uploadImage(file);
        return uploadResult.secure_url;
    }
};
exports.ImageResolver = ImageResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'image', type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof graphql_upload_1.FileUpload !== "undefined" && graphql_upload_1.FileUpload) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ImageResolver.prototype, "uploadImage", null);
exports.ImageResolver = ImageResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageResolver);
//# sourceMappingURL=image.resolver.js.map