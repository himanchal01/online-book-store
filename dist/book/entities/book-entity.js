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
exports.BookListResponse = exports.BookResponse = exports.BookModel = exports.Author = void 0;
const graphql_1 = require("@nestjs/graphql");
let Author = class Author {
};
exports.Author = Author;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "authorId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "authorImage", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Author.prototype, "email", void 0);
exports.Author = Author = __decorate([
    (0, graphql_1.ObjectType)()
], Author);
let BookModel = class BookModel {
};
exports.BookModel = BookModel;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookModel.prototype, "bookId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookModel.prototype, "bookName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookModel.prototype, "publishedDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookModel.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BookModel.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookModel.prototype, "genre", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookModel.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BookModel.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BookModel.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Author),
    __metadata("design:type", Author)
], BookModel.prototype, "author", void 0);
exports.BookModel = BookModel = __decorate([
    (0, graphql_1.ObjectType)()
], BookModel);
let BookResponse = class BookResponse {
};
exports.BookResponse = BookResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BookResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => BookModel),
    __metadata("design:type", BookModel)
], BookResponse.prototype, "data", void 0);
exports.BookResponse = BookResponse = __decorate([
    (0, graphql_1.ObjectType)()
], BookResponse);
let BookListResponse = class BookListResponse {
};
exports.BookListResponse = BookListResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BookListResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BookListResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BookListResponse.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], BookListResponse.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BookModel]),
    __metadata("design:type", Array)
], BookListResponse.prototype, "data", void 0);
exports.BookListResponse = BookListResponse = __decorate([
    (0, graphql_1.ObjectType)()
], BookListResponse);
//# sourceMappingURL=book-entity.js.map