export declare class Author {
    firstName?: string;
    lastName?: string;
    authorId?: string;
    authorImage?: string;
    email?: string;
}
export declare class BookModel {
    bookId: string;
    bookName: string;
    publishedDate: string;
    description: string;
    price: number;
    genre: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
}
export declare class BookResponse {
    status: number;
    message: string;
    data: BookModel;
}
export declare class BookListResponse {
    status: number;
    message: string;
    page: number;
    total: number;
    data: BookModel[];
}
