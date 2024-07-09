/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from "mongoose";
import { Book } from "./schema/book.schema";
import { UpdateBookInput } from "./dto/update-book.input";
import { CreateBookInput } from "./dto/create-book.input";
import { BookListResponse, BookResponse } from "./entities/book-entity";
import { GetAllBookInput, GetAllFilterBookInput, GetAllSearchBookInput } from "./dto/get-all-book.input";
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<Book>);
    create(createBookInput: CreateBookInput, authorId: string): Promise<BookResponse>;
    findAll(getAllBookInput: GetAllBookInput): Promise<BookListResponse>;
    findOne(id: string): Promise<BookResponse>;
    update(updateBookInput: UpdateBookInput): Promise<BookResponse>;
    remove(id: string): Promise<BookResponse>;
    getMyBook(getAllBookInput: GetAllBookInput, authorId: string): Promise<BookListResponse>;
    searchBook(getAllBookInput: GetAllSearchBookInput): Promise<BookListResponse>;
    filterBookByGenre(getAllBookInput: GetAllFilterBookInput): Promise<BookListResponse>;
}
