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
exports.GetAllFilterBookInput = exports.GetAllSearchBookInput = exports.GetAllBookInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let GetAllBookInput = class GetAllBookInput {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
};
exports.GetAllBookInput = GetAllBookInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetAllBookInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetAllBookInput.prototype, "limit", void 0);
exports.GetAllBookInput = GetAllBookInput = __decorate([
    (0, graphql_1.InputType)()
], GetAllBookInput);
let GetAllSearchBookInput = class GetAllSearchBookInput {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.searchTerm = "";
    }
};
exports.GetAllSearchBookInput = GetAllSearchBookInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetAllSearchBookInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetAllSearchBookInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], GetAllSearchBookInput.prototype, "searchTerm", void 0);
exports.GetAllSearchBookInput = GetAllSearchBookInput = __decorate([
    (0, graphql_1.InputType)()
], GetAllSearchBookInput);
let GetAllFilterBookInput = class GetAllFilterBookInput {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.genre = "";
    }
};
exports.GetAllFilterBookInput = GetAllFilterBookInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetAllFilterBookInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], GetAllFilterBookInput.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], GetAllFilterBookInput.prototype, "genre", void 0);
exports.GetAllFilterBookInput = GetAllFilterBookInput = __decorate([
    (0, graphql_1.InputType)()
], GetAllFilterBookInput);
//# sourceMappingURL=get-all-book.input.js.map