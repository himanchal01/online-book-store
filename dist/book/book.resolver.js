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
exports.BookResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const book_service_1 = require("./book.service");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const create_book_input_1 = require("./dto/create-book.input");
const update_book_input_1 = require("./dto/update-book.input");
const book_entity_1 = require("./entities/book-entity");
const get_all_book_input_1 = require("./dto/get-all-book.input");
let BookResolver = class BookResolver {
    constructor(bookService) {
        this.bookService = bookService;
    }
    findAll(getAllBookInput) {
        return this.bookService.findAll(getAllBookInput);
    }
    findOne(id) {
        return this.bookService.findOne(id);
    }
    createBook(createBookInput, context) {
        const authorId = context.req.user.id;
        return this.bookService.create(createBookInput, authorId);
    }
    updateBook(updateBookDto) {
        return this.bookService.update(updateBookDto);
    }
    removeBook(id) {
        return this.bookService.remove(id);
    }
    getBookByAuthor(getAllBookInput, context) {
        const authorId = context.req.user.id;
        return this.bookService.getMyBook(getAllBookInput, authorId);
    }
    searchBook(getAllSearchBookInput) {
        return this.bookService.searchBook(getAllSearchBookInput);
    }
    filterBook(getAllFilterBookInput) {
        return this.bookService.filterBookByGenre(getAllFilterBookInput);
    }
};
exports.BookResolver = BookResolver;
__decorate([
    (0, graphql_1.Query)(() => book_entity_1.BookListResponse, { name: 'books' }),
    __param(0, (0, graphql_1.Args)("GetAllBookInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_book_input_1.GetAllBookInput]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => book_entity_1.BookResponse, { name: 'book' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => book_entity_1.BookResponse),
    __param(0, (0, graphql_1.Args)('createBookInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_input_1.CreateBookInput, Object]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "createBook", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => book_entity_1.BookResponse),
    __param(0, (0, graphql_1.Args)('updateBookDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_book_input_1.UpdateBookInput]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "updateBook", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => book_entity_1.BookResponse),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "removeBook", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => book_entity_1.BookListResponse),
    __param(0, (0, graphql_1.Args)('GetMyBookInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_book_input_1.GetAllBookInput, Object]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "getBookByAuthor", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => book_entity_1.BookListResponse),
    __param(0, (0, graphql_1.Args)('searchBook')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_book_input_1.GetAllSearchBookInput]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "searchBook", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => book_entity_1.BookListResponse),
    __param(0, (0, graphql_1.Args)('filterBook')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_book_input_1.GetAllFilterBookInput]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "filterBook", null);
exports.BookResolver = BookResolver = __decorate([
    (0, graphql_1.Resolver)("Book"),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookResolver);
//# sourceMappingURL=book.resolver.js.map