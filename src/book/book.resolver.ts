import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BookService } from "./book.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { CreateBookInput } from "./dto/create-book.input";
import { UpdateBookInput } from "./dto/update-book.input";
import { BookListResponse, BookResponse } from "./entities/book-entity";
import { GetAllBookInput, GetAllFilterBookInput, GetAllSearchBookInput } from "./dto/get-all-book.input";
import { User } from "src/user/schema/user.schema";

@Resolver("Book")
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Query(() => BookListResponse, { name: 'books' })
    findAll(@Args("GetAllBookInput") getAllBookInput: GetAllBookInput): Promise<BookListResponse> {
        return this.bookService.findAll(getAllBookInput);
    }

    @Query(() => BookResponse, { name: 'book' })
    findOne(@Args('id', { type: () => String }) id: string): Promise<BookResponse> {
        return this.bookService.findOne(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BookResponse)
    createBook(@Args('createBookInput') createBookInput: CreateBookInput, @Context() context: { req: { user: User } }) {
        const authorId = context.req.user.id
        return this.bookService.create(createBookInput, authorId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BookResponse)
    updateBook(@Args('updateBookDto') updateBookDto: UpdateBookInput) {
        return this.bookService.update(updateBookDto);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BookResponse)
    removeBook(@Args('id', { type: () => String }) id: string) {
        return this.bookService.remove(id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => BookListResponse)
    getBookByAuthor(@Args('GetMyBookInput') getAllBookInput: GetAllBookInput, @Context() context: { req: { user: User } }): Promise<BookListResponse> {
        const authorId = context.req.user.id
        return this.bookService.getMyBook(getAllBookInput, authorId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => BookListResponse)
    searchBook(@Args('searchBook') getAllSearchBookInput: GetAllSearchBookInput): Promise<BookListResponse> {
        return this.bookService.searchBook(getAllSearchBookInput)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => BookListResponse)
    filterBook(@Args('filterBook') getAllFilterBookInput: GetAllFilterBookInput): Promise<BookListResponse> {
        return this.bookService.filterBookByGenre(getAllFilterBookInput)
    }

}