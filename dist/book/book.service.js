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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BookService = class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async create(createBookInput, authorId) {
        const createdBook = new this.bookModel({
            ...createBookInput, authorId: authorId, createdAt: Date.now(), updatedAt: Date.now()
        });
        const book = await createdBook.save();
        const author = {
            authorId: JSON.stringify(book.authorId)
        };
        const bookModel = {
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
        };
        const bookResponse = {
            status: 200,
            message: "book created successfully",
            data: bookModel
        };
        return bookResponse;
    }
    async findAll(getAllBookInput) {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit;
        const books = await this.bookModel.aggregate([
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
        ]).exec();
        const total = await this.bookModel.countDocuments().exec();
        const bookModel = books.map(book => {
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
            };
        });
        const bookList = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        };
        return bookList;
    }
    async findOne(id) {
        const books = await this.bookModel.aggregate([
            {
                $match: {
                    _id: new mongoose_2.Types.ObjectId(id),
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
        ]);
        if (!books) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        const book = books[0];
        const bookModel = {
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
        };
        return {
            status: 200,
            message: "book fetched successfully",
            data: bookModel
        };
    }
    async update(updateBookInput) {
        const book = await this.bookModel.findById(updateBookInput.id);
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${updateBookInput.id} not found`);
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
        const bookModel = {
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
        };
        return {
            status: 200,
            message: "Book updated successfully",
            data: bookModel
        };
    }
    async remove(id) {
        const book = await this.bookModel.findByIdAndDelete(id).exec();
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        const bookModel = {
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
        };
        return {
            status: 200,
            message: "Book deleted successfully",
            data: bookModel
        };
    }
    async getMyBook(getAllBookInput, authorId) {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit;
        const books = await this.bookModel.aggregate([
            { $match: { authorId: new mongoose_2.Types.ObjectId(authorId) } },
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
        ]).exec();
        const total = await this.bookModel.countDocuments({ authorId: new mongoose_2.Types.ObjectId(authorId) }).exec();
        const bookModel = books.map(book => ({
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
        }));
        const bookList = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        };
        return bookList;
    }
    async searchBook(getAllBookInput) {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit;
        const searchTerm = getAllBookInput.searchTerm || '';
        const books = await this.bookModel.aggregate([
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
        ]).exec();
        const total = books.length;
        const bookModel = books.map(book => {
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
            };
        });
        const bookList = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        };
        return bookList;
    }
    async filterBookByGenre(getAllBookInput) {
        const skip = (getAllBookInput.page - 1) * getAllBookInput.limit;
        const filterTerm = getAllBookInput.genre || '';
        const books = await this.bookModel.aggregate([
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
        ]).exec();
        const total = books.length;
        const bookModel = books.map(book => {
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
            };
        });
        const bookList = {
            status: 200,
            message: "Books fetched successfully",
            total: total,
            page: getAllBookInput.page,
            data: bookModel
        };
        return bookList;
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookService);
//# sourceMappingURL=book.service.js.map