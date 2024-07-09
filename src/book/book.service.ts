import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Book } from "./schema/book.schema";
import { UpdateBookInput } from "./dto/update-book.input";
import { CreateBookInput } from "./dto/create-book.input";
import { Author, BookListResponse, BookModel, BookResponse } from "./entities/book-entity";
import { GetAllBookInput, GetAllFilterBookInput, GetAllSearchBookInput } from "./dto/get-all-book.input";


@Injectable()
export class BookService {
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>) { }

    async create(createBookInput: CreateBookInput, authorId: string): Promise<BookResponse> {
        const createdBook = new this.bookModel({
            ...createBookInput, authorId: authorId, createdAt: Date.now(), updatedAt: Date.now()
        });
        const book = await createdBook.save()
        const author: Author = {
            authorId: JSON.stringify(book.authorId)
        }
        const bookModel: BookModel = {
            bookId: book.id,
            bookName: book.bookName,
            publishedDate: book.publishedDate,
            description: book.description,
            price: book.price,
            image: book.image,
            genre: book.genre,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            author: author
        }
        const bookResponse: BookResponse = {
            status: 200,
            message: "book created successfully",
            data: bookModel
        }
        return bookResponse;
    }


    async findAll(getAllBookInput: GetAllBookInput): Promise<BookListResponse> {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit
        const books = await this.bookModel.aggregate(
            [
                {
                    $skip: skip,
                },
                {
                    $limit: getAllBookInput.limit,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: { path: "$author", preserveNullAndEmptyArrays: true },
                },
                {
                    $project: {
                        bookId: "$_id",
                        bookName: 1,
                        publishedDate: 1,
                        description: 1,
                        price: 1,
                        image: 1,
                        genre: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        author: {
                            $cond: {
                                if: {
                                    $ne: ["author", null],
                                },
                                then: {
                                    _id: "$author._id",
                                    firstName: "$author.firstName",
                                    lastName: "$author.lastName",
                                    email: "$author.email",
                                    image: "$author.image",
                                },
                                else: null,
                            },
                        },
                    },
                },
            ]
        ).exec()
        const total = await this.bookModel.countDocuments().exec();

        const bookModel: BookModel[] = books.map(book => {
            return {
                bookId: book._id,
                bookName: book.bookName,
                publishedDate: book.publishedDate,
                description: book.description,
                price: book.price,
                image: book.image || "",
                genre: book.genre,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt,
                author: {
                    firstName: book.author.firstName,
                    lastName: book.author.lastName,
                    authorId: book.author._id,
                    authorImage: book.author.image,
                    email: book.author.email
                }
            }
        })

        const bookList: BookListResponse = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        }

        return bookList
    }


    async findOne(id: string): Promise<BookResponse> {
        const books = await this.bookModel.aggregate(
            [
                {
                    $match: {
                        _id: new Types.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: {
                        path: "$author",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        bookId: "$_id",
                        bookName: 1,
                        publishedDate: 1,
                        description: 1,
                        price: 1,
                        image: 1,
                        genre: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        author: {
                            _id: "$author._id",
                            firstName: "$author.firstName",
                            lastName: "$author.lastName",
                            email: "$author.email",
                            image: "$author.image",
                        },
                    },
                },
            ]
        )
        if (!books) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        const book = books[0]
        const bookModel: BookModel = {
            bookId: "$_id",
            bookName: book.bookName,
            publishedDate: book.publishedDate,
            description: book.description,
            price: book.price,
            image: book.image,
            genre: book.genre,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            author: {
                firstName: book.author.firstName,
                lastName: book.author.lastName,
                authorId: book.author._id,
                authorImage: book.author.image,
                email: book.author.email
            }
        }
        return {
            status: 200,
            message: "book fetched successfully",
            data: bookModel
        };
    }


    async update(updateBookInput: UpdateBookInput): Promise<BookResponse> {
        const book = await this.bookModel.findById(updateBookInput.id)
        if (!book) {
            throw new NotFoundException(`Book with ID ${updateBookInput.id} not found`)
        }
        const updatedBook = await this.bookModel.findByIdAndUpdate(updateBookInput.id, {
            $set: {
                bookName: updateBookInput.bookName || book.bookName,
                publishedDate: updateBookInput.publishedDate || book.publishedDate,
                description: updateBookInput.description || book.description,
                price: updateBookInput.price || book.price,
                genre: updateBookInput.genre || book.genre,
                image: updateBookInput.image || book.image,
                createdAt: book.createdAt,
                updatedAt: Date.now()
            }
        }, { new: true }).exec();
        const bookModel: BookModel = {
            bookId: updatedBook.id,
            bookName: updatedBook.bookName,
            publishedDate: updatedBook.publishedDate,
            description: updatedBook.description,
            price: updatedBook.price,
            genre: updatedBook.genre,
            image: updatedBook.image,
            createdAt: updatedBook.createdAt,
            updatedAt: updatedBook.updatedAt,
            author: {
                authorId: JSON.stringify(book.authorId),
            }
        }
        return {
            status: 200,
            message: "Book updated successfully",
            data: bookModel
        };
    }


    async remove(id: string): Promise<BookResponse> {
        const book = await this.bookModel.findByIdAndDelete(id).exec();
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        const bookModel: BookModel = {
            bookId: book.id,
            bookName: book.bookName,
            publishedDate: book.publishedDate,
            description: book.description,
            price: book.price,
            genre: book.genre,
            image: book.image,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            author: {
                authorId: JSON.stringify(book.authorId),
            }
        }
        return {
            status: 200,
            message: "Book deleted successfully",
            data: bookModel
        };
    }

    async getMyBook(getAllBookInput: GetAllBookInput, authorId: string): Promise<BookListResponse> {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit
        const books = await this.bookModel.aggregate([
            { $match: { authorId: new Types.ObjectId(authorId) } },
            { $skip: skip },
            { $limit: getAllBookInput.limit },
            {
                $lookup: {
                    from: "users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            { $unwind: { path: "$author", preserveNullAndEmptyArrays: true }, },
            {
                $project: {
                    bookId: "$_id",
                    bookName: 1,
                    publishedDate: 1,
                    description: 1,
                    price: 1,
                    image: 1,
                    genre: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    author: {
                        _id: '$author._id',
                        firstName: '$author.firstName',
                        lastName: '$author.lastName',
                        email: '$author.email',
                        image: '$author.image'
                    }
                }
            }
        ]).exec()
        const total = await this.bookModel.countDocuments({ authorId: new Types.ObjectId(authorId) }).exec();

        const bookModel: BookModel[] = books.map(book => ({
            bookId: book._id,
            bookName: book.bookName,
            publishedDate: book.publishedDate,
            description: book.description,
            price: book.price,
            image: book.image,
            genre: book.genre,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
            author: {
                firstName: book.author.firstName,
                lastName: book.author.lastName,
                authorId: book.author._id,
                authorImage: book.author.image,
                email: book.author.email
            }
        }))

        const bookList: BookListResponse = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        }

        return bookList
    }


    async searchBook(getAllBookInput: GetAllSearchBookInput): Promise<BookListResponse> {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit
        const searchTerm = getAllBookInput.searchTerm || '';
        const books = await this.bookModel.aggregate(
            [

                {
                    $skip: skip,
                },
                {
                    $limit: getAllBookInput.limit,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: { path: "$author", preserveNullAndEmptyArrays: true },
                },
                {
                    $match: {
                        bookName: {
                            $regex: searchTerm,
                            $options: "i",
                        },
                    },
                },
                {
                    $project: {
                        bookId: "$_id",
                        bookName: 1,
                        publishedDate: 1,
                        description: 1,
                        price: 1,
                        image: 1,
                        genre: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        author: {
                            $cond: {
                                if: {
                                    $ne: ["author", null],
                                },
                                then: {
                                    _id: "$author._id",
                                    firstName: "$author.firstName",
                                    lastName: "$author.lastName",
                                    email: "$author.email",
                                    image: "$author.image",
                                },
                                else: null,
                            },
                        },
                    },
                },
            ]
        ).exec()
        const total = books.length;

        const bookModel: BookModel[] = books.map(book => {
            return {
                bookId: book._id,
                bookName: book.bookName,
                publishedDate: book.publishedDate,
                description: book.description,
                price: book.price,
                image: book.image || "",
                genre: book.genre,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt,
                author: {
                    firstName: book.author.firstName,
                    lastName: book.author.lastName,
                    authorId: book.author._id,
                    authorImage: book.author.image,
                    email: book.author.email
                }
            }
        })

        const bookList: BookListResponse = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        }

        return bookList
    }

    async filterBookByGenre(getAllBookInput: GetAllFilterBookInput): Promise<BookListResponse> {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit
        const filterTerm = getAllBookInput.genre || '';
        const books = await this.bookModel.aggregate(
            [

                {
                    $skip: skip,
                },
                {
                    $limit: getAllBookInput.limit,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: { path: "$author", preserveNullAndEmptyArrays: true },
                },
                {
                    $match: {
                        genre: {
                            $regex: filterTerm,
                            $options: "i",
                        },
                    },
                },
                {
                    $project: {
                        bookId: "$_id",
                        bookName: 1,
                        publishedDate: 1,
                        description: 1,
                        price: 1,
                        image: 1,
                        genre: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        author: {
                            $cond: {
                                if: {
                                    $ne: ["author", null],
                                },
                                then: {
                                    _id: "$author._id",
                                    firstName: "$author.firstName",
                                    lastName: "$author.lastName",
                                    email: "$author.email",
                                    image: "$author.image",
                                },
                                else: null,
                            },
                        },
                    },
                },
            ]
        ).exec()
        const total = books.length;

        const bookModel: BookModel[] = books.map(book => {
            return {
                bookId: book._id,
                bookName: book.bookName,
                publishedDate: book.publishedDate,
                description: book.description,
                price: book.price,
                image: book.image || "",
                genre: book.genre,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt,
                author: {
                    firstName: book.author.firstName,
                    lastName: book.author.lastName,
                    authorId: book.author._id,
                    authorImage: book.author.image,
                    email: book.author.email
                }
            }
        })

        const bookList: BookListResponse = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        }

        return bookList
    }
}