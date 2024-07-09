import { BookService } from "./book.service";
import { CreateBookInput } from "./dto/create-book.input";
import { UpdateBookInput } from "./dto/update-book.input";
import { BookListResponse, BookResponse } from "./entities/book-entity";
import { GetAllBookInput, GetAllFilterBookInput, GetAllSearchBookInput } from "./dto/get-all-book.input";
import { User } from "src/user/schema/user.schema";
export declare class BookResolver {
    private readonly bookService;
    constructor(bookService: BookService);
    findAll(getAllBookInput: GetAllBookInput): Promise<BookListResponse>;
    findOne(id: string): Promise<BookResponse>;
    createBook(createBookInput: CreateBookInput, context: {
        req: {
            user: User;
        };
    }): Promise<BookResponse>;
    updateBook(updateBookDto: UpdateBookInput): Promise<BookResponse>;
    removeBook(id: string): Promise<BookResponse>;
    getBookByAuthor(getAllBookInput: GetAllBookInput, context: {
        req: {
            user: User;
        };
    }): Promise<BookListResponse>;
    searchBook(getAllSearchBookInput: GetAllSearchBookInput): Promise<BookListResponse>;
    filterBook(getAllFilterBookInput: GetAllFilterBookInput): Promise<BookListResponse>;
}
