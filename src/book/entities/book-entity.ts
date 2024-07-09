import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Author {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    authorId?: string;

    @Field({ nullable: true })
    authorImage?: string;

    @Field({ nullable: true })
    email?: string;

}


@ObjectType()
export class BookModel {

    @Field()
    bookId: string;

    @Field()
    bookName: string;

    @Field()
    publishedDate: string;

    @Field()
    description: string;

    @Field()
    price: number;

    @Field()
    genre: string;

    @Field()
    image: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => Author)
    author: Author

}

@ObjectType()
export class BookResponse {
    @Field()
    status: number;

    @Field()
    message: string

    @Field(() => BookModel)
    data: BookModel

}

@ObjectType()
export class BookListResponse {
    @Field()
    status: number;

    @Field()
    message: string;

    @Field()
    page: number

    @Field()
    total: number

    @Field(() => [BookModel])
    data: BookModel[]

}